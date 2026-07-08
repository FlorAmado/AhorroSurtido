
export function codigoInvitacion() {
  const mayusculas = "BCDFGHJKLMNPQRSTVWXYZ";
  const alfanumerico = "abcdefghjkmnpqrstuvwxyz1234567890";
    
  let cod1 = ""; 
  for (let i = 0; i < 2; i++) {
    cod1 += mayusculas.charAt(Math.floor(Math.random() * mayusculas.length));
  }
  
  let cod2 = "";
  for (let i = 0; i < 4; i++) {
    cod2 += alfanumerico.charAt(Math.floor(Math.random() * alfanumerico.length));
  }
  
  return `${cod1}-${cod2}`;
}

console.log(codigoInvitacion());