import bcrypt from "bcrypt";



// bcrypt.compare(사용자비밀번호,암호화된비밀번호)
!async function() {
    const plain = "1q2w3e4r";

    bcrypt.hash(plain,10,(err,data)=>{
        console.log("err = ", err);
        console.log("data = ", data);
    })

    const result = await bcrypt.hash(plain,10);
    console.log("result =",result);
}();