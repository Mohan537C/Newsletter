const exp=require("express");
const bodyParser=require("body-parser");
const req=require("request");
const https=require("https");
const e = require("express");
const app=exp();
app.use(exp.static("sub"));
app.use(bodyParser.urlencoded({extended:true}));
app.get("/",function(request,response){
    response.sendFile(__dirname+"/signup.htm");
});
app.post("/",function(req,res){
    const first=req.body.fname;
    const last=req.body.lname;
    const mail=req.body.email;
    const data={
        members:[
            {
                email_address : mail,
                status : "subscribed",
                merge_fields:{
                    FNAME:first,
                    LNAME:last
                }
            }
        ]
    };
    const url="https://us21.api.mailchimp.com/3.0/lists/591b33d568";
    const options={
        method:"POST",
        auth:"Mohan:f2e285ce878ed263a1a4d721115b25b9-us21"
    };
    const jdata=JSON.stringify(data);
    var request=https.request(url,options,function(response){
        response.on("data",function(data){
            if(response.statusCode===200){
                res.sendFile(__dirname+"/success.htm");
            }
            else{
                res.sendFile(__dirname+"/failure.htm");
            }
        })
    });
    request.write(jdata);
    request.end();
});
app.get("/developer",function(req,res){
    res.sendFile(__dirname+"/dev.html");
});
app.post("/failure",function(request,response){
    response.redirect("/");
});
app.listen(process.env.PORT || 1100,function(){
    console.log("Server is listening at port-1100....");
});
