
//O Programa
// - Desenvolva um programa que permita a entrada de um texto em um < textarea >.
// - Abaixo do textarea deve haver 2 radio buttons para permitir que o usuário escolha entre texto cifrado e decifrado.
// - Ao lado dos radio buttons deve haver um campo input que permita ao usuário que informe a cifra.
// - A cifra tem apenas 1 digito e pode ser numérica ou alfabética. Caso o usuário informe um caractere alfabético, a cifra será a posição do respectivo caractere dentro do alfabeto, por exemplo, "a" = 1, "b" = 2, "c" = 3 e assim por diante. 

//captures IO
const textInput = document.querySelector('#textInput')
const output = document.querySelector('#output')
const FORM = document.querySelector('#formCipher')

let cipherValue

//checks type of char passed as cipher key
function normalizecipher(val) {
  let normalized
  if (isNaN(Number(val)) && isALetter(val)) {
    normalized = val.toLowerCase().charCodeAt(0) - 96
  } else if (isNaN(Number(val)) === false && (val < 10 && val > 0)) {
    normalized = Number(val)
  } else {
    alert('Valor da Cifra deve ser entre numérico entre 0 e 10 ou letra do alfabeto')
    return false
  }
  return normalized
}

//initializes the main function
FORM.addEventListener('submit', e => {
  e.preventDefault()
  const OP = document.querySelector('input[name=operation]:checked').value
  const inputCypher = document.querySelector('#cipherValue').value.trim()
  console.log('cipher input has::', inputCypher)

  cipherValue = normalizecipher(inputCypher)

  if (cipherValue) {
    //if operation is decoding, inverts key
    if (OP === 'decode') {
      cipherValue = cipherValue * -1
    }
    //calls the encode/decode function
    const cipheredValue = cipherTextString(textInput.value, cipherValue)

    //output any given result to the screen
    output.value = cipheredValue

  }
})

function cipherTextString(str, key) {
  let cipherResult = ''
  //itera pela string
  for (let i = 0; i < str.length; i++) {
    console.log('for loop at::', i, str[i])
    let swapedCharcode = '' // inicializa var que recebera valor ja alterado
    const currCharcode = str.charCodeAt(i) //copia valor ref ao char sendo iterado

    //se for char lowercase, essa logica
    if (isLowerCase(str[i])) {
      console.log('entrou lowercase')
      if ((currCharcode + key) <= 122) {
        if ((currCharcode + key) >= 97) {
          swapedCharcode = currCharcode + key
        } else
          swapedCharcode = currCharcode + 26 + key
      } else
        swapedCharcode = currCharcode + key - 26
    }

    //se for char uppercase, essa logica
    else if (isUpperCase(str[i])) {
      console.log('entrou uppercase')
      if ((currCharcode + key) <= 90) {
        if ((currCharcode + key) >= 65) {
          swapedCharcode = currCharcode + key
        } else
          swapedCharcode = currCharcode + 26 + key
      } else
        swapedCharcode = currCharcode + key - 26
    }

    //se for char lowercase acentuado, essa logica
    else if (isLowerCaseSpecial(str[i])) {
      console.log('entrou lowerspec')
      if ((currCharcode + key) <= 255) {
        if ((currCharcode + key) >= 224) {
          swapedCharcode = currCharcode + key
        } else
          swapedCharcode = currCharcode + 32 + key
      } else
        swapedCharcode = currCharcode + key - 32
    }

    //se for char uppercase acentuado, essa logica
    else if (isUpperCaseSpecial(str[i])) {
      console.log('entrou upperspec')
      if ((currCharcode + key) <= 223) {
        if ((currCharcode + key) >= 192) {
          swapedCharcode = currCharcode + key
        } else
          swapedCharcode = currCharcode + 30 + key
      } else
        swapedCharcode = currCharcode + key - 30
    }
    else {
      // se o tipo do caractere nao for lowercase, uppercase ou acentuado lower, acentuado upper, retorna o caractere sem alteração
      // assim preservando espaços e line breaks
      swapedCharcode = currCharcode
    }

    cipherResult = cipherResult.concat(String.fromCharCode(swapedCharcode))
  }
  return cipherResult
}

//returns true if char is simple letter
function isALetter(char) {
  return (char >= 'a' && char <= 'z') || (char >= 'A' && char <= 'Z')
}

//if char is lowercase return true
function isLowerCase(char) {
  return char >= 'a' && char <= 'z'
}
//if char is uppercase return true
function isUpperCase(char) {
  return char >= 'A' && char <= 'Z'
}
//if char is spec lowercase return true
function isLowerCaseSpecial(char) {
  return (char >= 'à' && char <= 'ÿ')
}
//if char is spec uppercase true
function isUpperCaseSpecial(char) {
  return (char >= 'À' && char <= 'ß')
}

//onclick selects the content of the textarea input
textInput.addEventListener('click', (e) => {
  e.target.select()
})

//onclick, selects the output field content
output.addEventListener('click', (e) => {
  const source = e.target
  // source.select()
  source.setSelectionRange(0, source.value.length)

})

//implements button copy to clipboard
document.querySelector('#clipboard').addEventListener('click', () => {
  const source = output
  source.select()
  source.setSelectionRange(0, source.value.length)
  navigator.clipboard.writeText(source.value)
  alert('Valor foi copiado para o Clipboard')

})

//clears all fields
document.querySelector('button[type=reset]').addEventListener('click', () => {
  FORM.reset()
  textInput.focus()
})
