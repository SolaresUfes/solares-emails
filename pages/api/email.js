const nodemailer = require('nodemailer');

export default async (req, res) => {
  // cria um objeto de transporte para o envio de e-mails
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: process.env.EMAIL,
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
      accessToken: process.env.GOOGLE_ACCESS_TOKEN,
    }
  });

  await new Promise((resolve, reject) => {
    // verify connection configuration
    transporter.verify(function (error, success) {
      if (error) {
        console.log(error);
        reject(error);
      } else {
        console.log("Server is ready to take our messages");
        resolve(success);
      }
    });
  });

  // envia um e-mail com o conteúdo do arquivo CSV
  async function sendEmail(info) {
    // console.log(req.body.html);

    let bodyText = req.body.body.split('~');
    bodyText = bodyText.map(item => {
      if (item[0] === '@') {
        let variavel = item.substr(1);
        variavel = `${info[variavel]}`
        return variavel;
      }
      return item;
    });

    bodyText = bodyText.join('');

    let mailOptions = {};

    if (req.body.typeBody === 'HTML') {
      mailOptions = {
        from: req.body.auth.email,
        to: info.email,
        subject: req.body.subject,
        html: bodyText,
      };
    } else {
      mailOptions = {
        from: req.body.auth.email,
        to: info.email,
        subject: req.body.subject,
        text: bodyText,
      };
    }

    await new Promise((resolve, reject) => {
      // send mail
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
          res.status(400).json({ status: "ERRO" });
        } else {
          console.log('Email sent: ' + info.response); // se deu certo, mostra a resposta do servidor
        }
      });
    });
  }

  // le o arquivo CSV e envia um e-mail a cada segundo
  const promises = req.body.list.map((element, i) =>
    new Promise(resolve =>
      setTimeout(() => {
        // console.log((i + 1) + ' - ' + element.nome);
        if(element.email){
          sendEmail(element);
          resolve();
        }
        
      }, 1000 * i)
    )
  )
  Promise.all(promises).then(() => {
    console.log('Finished!');
    res.status(200).json({ status: "Finalizado" });
  })

}