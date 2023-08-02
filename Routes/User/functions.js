import jwt from 'jsonwebtoken';
import { Raspberry, Stats, User } from '../../db/Sequelize.js';
import bcrypt from 'bcrypt';
import { private_key } from '../../auth/private_key.js';
import PdfPrinter from 'pdfmake';
import fs from 'fs';
const fonts = {
  Roboto: {
    normal: './fonts/Open_Sans/OpenSans-VariableFont_wdth,wght.ttf',
    bold: './fonts/Open_Sans/OpenSans-VariableFont_wdth,wght.ttf',
    italics: './fonts/Open_Sans/OpenSans-Italic-VariableFont_wdth,wght.ttf',
    bolditalics: './fonts/Open_Sans/OpenSans-Italic-VariableFont_wdth,wght.ttf',
  },
};
const printer = new PdfPrinter(fonts);

export const LoginHandler = (req, res) => {
  const { email, password } = req.body;
  console.log('email', email);
  console.log('password', password);
  User.findOne({ where: { email }, include: Raspberry })
    .then(user => {
      if (user) {
        bcrypt.compare(password, user.password, (err, result) => {
          if (err) {
            return res.status(400).json({ msg: 'something went wrong' });
          }
          if (result) {
            console.log('user', user);
            const token = jwt.sign(
              {
                userId: user.id,
                name: user.name,
                number: user.number,
                accessLevel: user.accessLevel,
                rbpid: user.Raspberry.id,
              },
              private_key,
              {
                expiresIn: '24h',
              }
            );
            user.loginTryCounter = 5;
            const userTemp = user.toJSON();
            delete userTemp.password;
            user.save().then(() => {
              res.json({
                msg: 'successfully connected',
                user: userTemp,
                token,
              });
            });
          } else {
            user.loginTryCounter = user.loginTryCounter - 1;
            const count = user.loginTryCounter;
            user.save().then(() => {
              return res.status(401).json({ msg: 'wrong password', count });
            });
          }
        });
      } else {
        return res.status(404).json({
          msg: `It's look like there is no user linked with that email`,
        });
      }
    })
    .catch(err => {
      res.status(400).json({
        msg: `something went wrong`,
        err,
      });
    });
};

export const printStatsFile = (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    return res.status(400).json({ msg: 'something went wrong' });
  }
  User.findByPk(userId, { include: Stats })
    .then(user => {
      let docDefinition = {
        content: [
          {
            fontSize: 16,
            table: {
              widths: ['50%', '50%'],
              body: [
                [
                  {
                    text: 'Saved stats',
                    border: [false, false, false, true],
                    margin: [-5, 0, 0, 10],
                  },
                ],
              ],
            },
          },
          {
            fontSize: 11,
            table: {
              widths: ['33%', '33%', '33%'],
              body: [
                [
                  { text: 'month', border: [false, true, false, true] },
                  { text: 'index', border: [false, true, false, true] },
                  { text: 'price', border: [false, true, false, true] },
                ],
                ...user.Stats.map((el, i) => {
                  return [
                    { text: el.month, border: [false, true, false, true] },
                    { text: el.index, border: [false, true, false, true] },
                    { text: el.price, border: [false, true, false, true] },
                  ];
                }),
              ],
            },
          },
        ],
      };
      const options = {};
      const name = 'indexes' + userId + Date.now().toLocaleString() + '.pdf';
      // create invoice and save it to invoices_pdf folder
      const pdfDoc = printer.createPdfKitDocument(docDefinition, options);
      pdfDoc.pipe(fs.createWriteStream('stats_pdf/' + name));
      pdfDoc.end();
      return res.json({
        msg: 'success',
        url: 'http://localhost:9000/stats_pdf/' + name,
      });
    })
    .catch(err => {
      return res.status(500).json({ msg: 'something went wrong', err });
    });
};
