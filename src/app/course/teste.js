const senha = `
12345
brasil
BR1223a
jacare5@
3mulapreta@
PIrulinha5@
 ,
itingaArroba

teo
`
console.log(senha.match(/^.{6,20}$/gm));
console.log(senha.match(/^.(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$%&*|:?!]).{6,20}$/gm));