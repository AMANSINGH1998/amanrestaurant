const express=require('express')
const app=express()
const Sequelize=require("sequelize")
const Datatypes=Sequelize.DataTypes
app.use('/',express.static(__dirname+'/public'))


const nodemailer = require('nodemailer')
 port=process.env.PORT ||5464
app.get('/register', (req,res) => {
    console.log('I M CLICKED ')
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
               user: 'apnirassoikamlanagar@gmail.com',
               pass: 'apnirassoi123456789'
           }
    });
    maillist = `${req.query['email']},apnirassoikamlanagar@gmail.com`
    const mailOptions = {
        from: 'sabbystudycentrestudents@gmail.com', // sender address
        cc: `${maillist}`, // list of receivers
        subject: 'Subject of your email', // Subject line 
        html: `Hi ${req.query['firstname']} 
        ${req.query['lastname']}!/\n
        Welcome to APNI RASSOI :- 
        your order is :-${req.query['order']}
        is delivered at Address:-
        ${req.query['address']}

        THANK YOU FOR ORDERING FOOD ENJOY YOUR HEALTHY FOOD`
        // plain text body
    };
    transporter.sendMail(mailOptions, function (err, info) {
        if(err)
          console.log(err)
        else
          console.log(info);
    })
    res.redirect('/')




})



const db=new Sequelize(
    {
        dialect:'sqlite',
        storage:__dirname + '/restarauntstestsirtest4.db'
    })
    const Order=db.define('ORDER',
    {
        Table_no:Datatypes.INTEGER,
        order:Datatypes.STRING,
        price:Datatypes.INTEGER
    })
    db.sync()
    db.authenticate().then(()=>
    {
        console.log("SUCCCESSFULLY CONNECTED")
    }).catch((err)=>{
        console.error
    })


    app.get('/insert',(req,res)=>
    {
        Order.create({
            Table_no:req.query["table"],
            order:req.query["placeorder"],
            price:req.query["price"]
         })
     console.log("insert")
    console.log(req.query['table'])
    
    })


    app.get('/bill',(req, res)=>
    {
        Order.findAll({where: {Table_no:req.query["fbill"]  }}).then(ans=>
        {
            console.log(ans)
            
            
            
            const str = ans.reduce((acc, val) => {
                return acc + `<li> ${val.order} : ${val.price} </li>`
            }, '')
            const ans1=ans.reduce((acc,val)=>
            {
                return acc+ +val.price
    
    
    
            },0);
    
            
            res.send(`
                <html>
                    <body>
                    <div align="center">
                    <h1 align="center" style="letter-spacing:17px;font-weight:100">YOUR BILL</h1>
                    <h3 align="center" style="letter-spacing:11px;font-weight:100">TABLE_NO: </h3>${ans[0].Table_no}
    
                    <br>
                    <h3 align="center" style="letter-spacing:11px;font-weight:100">ORDERS: </h3>
                    ${str}  
                    <h3 align="center" style="letter-spacing:11px;font-weight:100">AMOUNT :</h3>
                    ${ans1}
                    </div>
                    </body>
                </html>
            `)
    
        })
    
    })
    

app.listen(1972,function()
{
    console.log(`connected
    http://localhost:1972
    `)
})

