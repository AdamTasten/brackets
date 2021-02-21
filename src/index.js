module.exports = function check(str, bracketsConfig) {
  let checking = 0,
  checkingForRepeating = 0,
    closingShouldBe = [];
  for (let i = 0; i < str.length; i++) {
    for (let j = 0; j < bracketsConfig.length; j++) {
        //если для текущей скобки из последовательности открывающая и закрывающая одинаковы
      if (
        str[i] === bracketsConfig[j][0] &&
        bracketsConfig[j][0] === bracketsConfig[j][1]
      ) {
        checkingForRepeating++;
        //если повторяющиеся скобки нечётного количества
        //if (checkingForRepeating%2 === 1) closingShouldBe.push(bracketsConfig[j][1]);
        
        if (str[i] !== closingShouldBe[closingShouldBe.length - 1]) 
        {
            if (closingShouldBe.includes(str[i])) return false;
            closingShouldBe.push(bracketsConfig[j][1]);
        }
        else closingShouldBe.pop(bracketsConfig[j][1]);
      }
      //если текущая скобка из последовательности - открывающая
      else if (str[i] === bracketsConfig[j][0]) {
        checking++;
        closingShouldBe.push(bracketsConfig[j][1]);
        //console.log(closingShouldBe);
      }
      //если текущая скобка из последовательности - закрывающая
      else if (str[i] === bracketsConfig[j][1]) {
        if (str[i] !== closingShouldBe[closingShouldBe.length - 1])
          return false; //если закрывающая скобка не та, что требуется
        closingShouldBe.pop();
        checking--;
      }
    }
    if (checking < 0) return false; //если где-то скобка закрывающая оказалась раньше открывающей
  }
  if (checkingForRepeating%2 === 1) return false;//если повторяющиеся скобки нечётного числа (т.е. нет закрывающей)
  if (checking !== 0) return false; //если число скобок открывающих не совпадает с числом закрывающих
  return true;
}
