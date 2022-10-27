//1. ELEMENTOS E OPERAÇÕES DE USO "EXTERNO".

//Variáveis com os códigos HTML dos botões escondidos na seta:
    let tbutton_rad = '<input type="button" class="bt" value="DEG" id="rad" onclick="radDeg()"> '
    let tbutton_sin ='<input type="button" class="bt" value="sin" id="sin" onclick="sine()"> '
    let tbutton_cos ='<input type="button" class="bt" value="cos" id="cos" onclick="cosine()"> '
    let tbutton_tan ='<input type="button" class="bt" value="tan" id="tan" onclick="tangent()"> '
    let tbutton_mod ='<input type="button" class="bt" value="|x|" id="abs" onclick="module()"> '
    let line1more = '<br>' + tbutton_rad + tbutton_sin + tbutton_cos + tbutton_tan + tbutton_mod

    let tbutton_inv ='<input type="button" class="bt" value="INV" id="inv" onclick="functionInverse()"> '
    let tbutton_e ='<input type="button" class="bt" value="e" id="e" onclick="numberEuler()"> '
    let tbutton_ln ='<input type="button" class="bt" value="ln" id="ln" onclick="logNeperian()"> '
    let tbutton_log ='<input type="button" class="bt" value="log" id="log" onclick="logInBase10()"> '
    let tbutton_inverse ='<input type="button" class="bt" value="1/x" id="inverse" onclick="inverse()"> '
    let line2more = '<br>' + tbutton_inv + tbutton_e + tbutton_ln + tbutton_log + tbutton_inverse

//Variáveis de conjunto:
    let buttons = document.getElementById('buttons') // elemento "div" com os botões iniciais.
    let buttons_ini = buttons.innerHTML // HTML dos botões que aparecem inicialmente.
    let buttons_more = buttons_ini + line1more + line2more // HTML da totalidade dos botões.

//Elemento "div" onde aperecem as entradas e os resultados:
    let res = document.getElementById('res') 

//Função usada para remover o foco dos botões após um "click":
    function onclickBlur() {
        let bt = document.getElementsByClassName('bt') //seleção dos botões por classe.
        for (let i = 0; i < bt.length; i++) {
            bt[i].addEventListener('click', function() {
                this.blur()
            })
        }
    }
    onclickBlur()

//Variável usada para o controle dos botões da seta:
    let v_open_arrow = false 

//Função para aparecer e esconder botões da seta:
    function moreButtons() {
        v_open_arrow = !v_open_arrow
        if (v_open_arrow) {    
            buttons.innerHTML = buttons_more
            onclickBlur()
            let button_arrow = document.getElementById('more')
            button_arrow.value = '▲'
        } else {
            buttons.innerHTML = buttons_ini
            onclickBlur()
            let button_arrow = document.getElementById('more')
            button_arrow.value = '▼'
        }
    }

//Variável usada para fazer alteração de estado entre radianos(true) e graus(false):
    let rad_deg = true 

//Função para trocar estado radiano-grau:
    function radDeg() {
        rad_deg = !rad_deg
        if (rad_deg) {
            let button_rad = document.getElementById('rad')
            let info_rad = document.getElementById('info')
            info_rad.innerHTML = 'rad'
            button_rad.value = 'DEG'
        } else {
            let button_rad = document.getElementById('rad')
            let info_rad = document.getElementById('info')
            info_rad.innerHTML = 'deg'
            button_rad.value = 'RAD'  
        }
    }

//Variável usada para fazer alteração de estado dos botões das funções trigonométricas para seus arcos:
    let inv = false 

//Função para trocar o sinal dos botões trigonométricos para seus arcos:
    function functionInverse() {
        inv = !inv
        if (inv) {
            let button_sin = document.getElementById('sin')
            let button_cos = document.getElementById('cos')
            let button_tan = document.getElementById('tan')
            button_sin.value = 'asin'
            button_cos.value = 'acos'
            button_tan.value = 'atan'
        } else {
            let button_sin = document.getElementById('sin')
            let button_cos = document.getElementById('cos')
            let button_tan = document.getElementById('tan')
            button_sin.value = 'sin'
            button_cos.value = 'cos'
            button_tan.value = 'tan'        
        }
        
    }


//2. ELEMENTOS E FUNÇÕES DE TRABALHO "INTERNO"

// Lista interna com todos os elementos da expressão numérica inserida ou seu resultado:
    let en = [] 

//Função usada para "limpeza" interna de escrita de elementos HTML:
    function clearInnerHTML(element) {
        element.innerHTML = ""
    }

//Função usada para escrever ou reescrever internamente aos elementos HTML:
    function writeInElement(element, text) {
        element.innerHTML = text
    }

//Função para contar elementos numa lista:
    function count(list = [], element) {
        let c = 0
        for (let e of list) {
            if (e == element) {
                c++
            }
        }
        return c
    }

/*Função usada para achar o índice do parêntese aberto correspondente 
a um outro fechado de índice conhecido numa lista:*/ 
    function blockParenthesesOpen(i, list = []) {
        let npf = 0
        let npa = 0
        for (i; i >= 0; i--) {
            if (list[i] == ')') {
                npf++   
            }
            if (list[i] == '(') {
                npa++
            }
            if ((npf - npa) == 0) {
                return i
            }
        }
    }

/*Função usada para achar o índice do parêntese fechado correspondente 
a um outro aberto de índice conhecido numa lista:*/ 
    function blockParenthesesClose(i, list = []) {
        let npa = 0
        let npf = 0
        for (i; i < list.length; i++) {
            if (list[i] == '(') {
                npa++   
            }
            if (list[i] == ')') {
                npf++
            }
            if ((npa - npf) == 0) {
                return i
            }
        }
    }


//3. FUNÇÕES DE ESCRITA DAS EXPRESSÕES NUMÉRICAS

//Função modelo para os números:
    function numbers(cod){
        if (Number(en[en.length - 1]) || en[en.length - 1] == 0 || en[en.length - 1] == '.') {
            en[en.length - 1] += cod
        } else {
            en.push(cod)
        }
        writeInElement(res, en.join(''))    
    }

//Números de 0 a 9:
    function number0() {
        let cod = '0'
        numbers(cod)
    }

    function number1() {
        let cod = '1'
        numbers(cod)
    }

    function number2() {
        let cod = '2'
        numbers(cod)
    }

    function number3() {
        let cod = '3'
        numbers(cod)
    }

    function number4() {
        let cod = '4'
        numbers(cod)
    }

    function number5() {
        let cod = '5'
        numbers(cod)
    }

    function number6() {
        let cod = '6'
        numbers(cod)
    }  

    function number7() {
        let cod = '7'
        numbers(cod)
    }

    function number8() {
        let cod = '8'
        numbers(cod)
    }

    function number9() {
        let cod = '9'
        numbers(cod)
    }

//"." (ou ","):
    function point() {
        if (en.length == 0) {
            en.push('.')
        } else if (!en[en.length - 1].includes('.')) {
            if (Number(en[en.length - 1]) || Number(en[en.length - 1]) == 0) {
                en[en.length - 1] += '.'
            } else {
                en.push('.')
            }
        }
        writeInElement(res, en.join(''))
    }

//Números especiais:
    function numberPi() {
        en.push(['π'])
        writeInElement(res, en.join(''))             
    }

    function numberEuler() {
        en.push(['e'])
        writeInElement(res, en.join(''))      
    }

//Função modelo para os operadores:
    function operations(cod){
        if (!en.length == 0) {
            en.push(cod)
        }
        writeInElement(res, en.join(''))     
    }

//Operadores:
    function sum() {            
        let cod = '+'
        operations(cod)
    }

    function subt() {           
        en.push('-')
        writeInElement(res, en.join(''))
    }

    function multip() {         
        let cod = 'x'
        operations(cod)
    }

    function division() {       
        let cod = '/'
        operations(cod)
    }

    function pot() {            
        let cod = '^'
        operations(cod)
    }

//Parênteses:
    function parenthesesOpen() {
        en.push('(')
        writeInElement(res, en.join(''))
    }

    function parenthesesClose() {
        if ((count(en, '(') - count(en, ')')) > 0) {
            en.push(')')
            writeInElement(res, en.join(''))
        }
    }

//Função modelo para os operadores funcionais, exceto "inverse()":
    function modelFunctions(cod) {
        if (en.length == 0) {
            en.push([cod], '(', '0', ')')
        } else if (Number(en[en.length - 1]) || Number(en[en.length - 1]) == 0) {
            let x = en.pop()
            en.push([cod], '(', x, ')')
        } else if (en[en.length - 1][0] == 'π' || en[en.length - 1][0] == 'e') {
            let x = en.pop()
            en.push([cod], '(', x, ')')
        } else if (en[en.length - 1] == ')') {
            let i = blockParenthesesOpen(en.length - 1, en)
            let l
            if (typeof en[i - 1] == 'object') {
                if (en[i - 1][0] != 'π' && en[i - 1][0] != 'e') {
                    l = en.slice(i - 1, en.length)
                    l.unshift('(')
                    l.push(')')
                    l.unshift([cod])
                    en.splice(i - 1, en.length - i + 1)
                } else {
                    l = en.slice(i, en.length)
                    l.unshift([cod])
                    en.splice(i, en.length - i)
                }
            } else {
                l = en.slice(i, en.length)
                l.unshift([cod])
                en.splice(i, en.length - i)
            }
            for (let element of l) {
                en.push(element)
            }
        }
        writeInElement(res, en.join(''))    
    }

//Operadores funcionais:
    function sqrt() {
        let cod = 'sqrt'
        modelFunctions(cod)
    }

    function fact() {
        let cod = 'fact'
        modelFunctions(cod)
    }

    function sine() {
        let cod
        if (inv) {
            cod = 'asin'
        } else {
            cod = 'sin'
        }
        modelFunctions(cod)
    }

    function cosine() {
        let cod
        if (inv) {
            cod = 'acos'
        } else {
            cod = 'cos'
        }
        modelFunctions(cod)
    }

    function tangent() {
        let cod
        if (inv) {
            cod = 'atan'
        } else {
            cod = 'tan'
        }
        modelFunctions(cod)
    }

    function logNeperian() {
        let cod = 'ln'
        modelFunctions(cod)
    }

    function logInBase10() {
        let cod = 'log'
        modelFunctions(cod)
    }

    function module() {
        let cod = 'abs'
        modelFunctions(cod)
    }

//Função inversa "(1/x)":
    function inverse() {
        if (en.length == 0) {
            en.push('(', '1', '/', '0', ')')
        } else if (Number(en[en.length - 1]) || Number(en[en.length - 1]) == 0) {
            let x = en.pop()
            en.push('(', '1', '/', x, ')')
        } else if (en[en.length - 1][0] == 'π' || en[en.length - 1][0] == 'e') {
            let x = en.pop()
            en.push('(', '1', '/', x, ')')
        } else if (en[en.length - 1] == ')') {
            let i = blockParenthesesOpen(en.length - 1, en)
            let l
            if (typeof en[i - 1] == 'object') {
                if (en[i - 1][0] != 'π' && en[i - 1][0] != 'e') {
                    l = en.slice(i - 1, en.length)
                    l.unshift('(')
                    l.push(')', ')')
                    l.unshift('(', '1', '/')
                    en.splice(i - 1, en.length - i + 1)
                } else {
                    l = en.slice(i, en.length)
                    l.unshift('(', '1', '/')
                    l.push(')')
                    en.splice(i, en.length - i)        
                }
            } else {
                l = en.slice(i, en.length)
                l.unshift('(', '1', '/')
                l.push(')')
                en.splice(i, en.length - i)
            }
            for (let element of l) {
                en.push(element)
            }   
        }
        writeInElement(res, en.join(''))
    }

//Função delete 1 (apaga completamente a expressão):
    function clean() {
        clearInnerHTML(res)
        en.splice(0, en.length) 
    }

//Função de delete 2 (apaga o último caractere):
    function buttonDel() {
        let t = en[en.length - 1].length
        if (t == 1 || typeof en[en.length - 1] == 'object') {
            en.pop()
        } else if (t > 1) {
            let list = []
            for (let letter of en[en.length - 1]) {
                list.push(letter)
            }
            list.pop()
            en[en.length - 1] = list.join('')
        }
        writeInElement(res, en.join(''))
    }


//4. RESOLUÇÃO DAS EXPRESSÕES

//Função usada para o cálculo fatorial:
    function factorial(x) {
        let n = Math.abs(x)
        if ((n - Math.trunc(n)) > 0 || x < 0) {
            throw new Error('ERRO1! O argumento de "fat" deve ser natural.')
        }
        if (x == 0 || x == 1) {
            return 1
        }
        if (x > 1) {
            return x * factorial(x - 1)
        }
    }

//Função para converter graus em radianos:
    function degConverterAdRad(a) {
        return ((Math.PI * a) / 180)
    }

//Função para converter radianos em graus:
    function radConverterAdDeg(a) {
        return ((180 * a) / Math.PI)
    }

//Função usada para validar as expressões numéricas "puras"(apenas números e operadores):
    function validateExpression(list = []) {
        if (list.length == 0) {
            list.push('0')
        }
        if (!Number(list[list.length - 1]) && Number(list[list.length - 1]) != 0) {
            throw new Error(`ERRO2! Expressão inválida`)
        }
        if (list[0] == '+' || list[0] == '-') {
            if (Number(list[1]) || Number(list[1]) == 0) {
                list[0] == '+' ? list[1] = Number(list[1]) : list[1] = -1 * Number(list[1])
                list.shift()
            } else {
                throw new Error(`ERRO3! Expressão inválida`)
            }
        }
        if (!Number(list[0]) && Number(list[0]) != 0) {
            throw new Error(`ERRO4! Expressão inválida`)
        }
        let count_nan = 0
        for (let element of list) {
            if (Number(element) || Number(element) == 0) {
                count_nan = 0
            } else {
                count_nan++
                if (count_nan == 2) {
                    throw new Error(`ERRO5! Expressão inválida`)
                } 
            }
        }
        if (list.includes('.')) {
            throw new Error(`ERRO6! Expressão inválida`)    
        }
        let count_num = 0
        for (let element of list) {
            if (Number(element) || Number(element) == 0) {
                count_num++
                if (count_num == 2) {
                    throw new Error(`ERRO7! Expressão inválida`)
                } 
            } else {
                count_num = 0 
            }
        }
    }

//Função usada para o cálculo das expressões numéricas "puras"(apenas números e operadores):
    function resolution(list = []) {
        let result
        if (list.length == 1) {
            result = Number(list[0])
            return result
        }
        while (list.length > 3) {
            let i
            if (list.includes('^')) {
                i = list.indexOf('^')
                result = Number(list[i - 1]) ** Number(list[i + 1])
                list.splice(i - 1, 3, result)
                continue
            }
            if (list.includes('x') && list.includes('/')) {
                if (list.indexOf('x') < list.indexOf('/')) {
                    i = list.indexOf('x')
                    result = Number(list[i - 1]) * Number(list[i + 1])
                    list.splice(i - 1, 3, result)
                    continue
                } else {
                    i = list.indexOf('/')
                    result = Number(list[i - 1]) / Number(list[i + 1])
                    list.splice(i - 1, 3, result)
                    continue
                }
            }
            if (list.includes('x')) {
                i = list.indexOf('x')
                result = Number(list[i - 1]) * Number(list[i + 1])
                list.splice(i - 1, 3, result)
                continue        
            }
            if (list.includes('/')) {
                i = list.indexOf('/')
                result = Number(list[i - 1]) / Number(list[i + 1])
                list.splice(i - 1, 3, result)
                continue        
            }
            if (list.includes('+') && list.includes('-')) {
                if (list.indexOf('+') < list.indexOf('-')) {
                    i = list.indexOf('+')
                    result = Number(list[i - 1]) + Number(list[i + 1])
                    list.splice(i - 1, 3, result)
                    continue
                } else {
                    i = list.indexOf('-')
                    result = Number(list[i - 1]) - Number(list[i + 1])
                    list.splice(i - 1, 3, result)
                    continue
                }
            }
            if (list.includes('+')) {
                i = list.indexOf('+')
                result = Number(list[i - 1]) + Number(list[i + 1])
                list.splice(i - 1, 3, result)
                continue        
            }
            if (list.includes('-')) {
                i = list.indexOf('-')
                result = Number(list[i - 1]) - Number(list[i + 1])
                list.splice(i - 1, 3, result)
                continue        
            }
        }
        if (list.length == 3) {
            if (list[1] == '^') {
                result = Number(list[0]) ** Number(list[2])
                return result
            }
            if (list[1] == 'x' || list[1] == '/') {
                if (list[1] == 'x') {
                    result = Number(list[0]) * Number(list[2])
                } else {
                    result = Number(list[0]) / Number(list[2])
                }
                return result
            }
            if (list[1] == '+' || list[1] == '-') {
                if (list[1] == '+') {
                    result = Number(list[0]) + Number(list[2])
                } else {
                    result = Number(list[0]) - Number(list[2])
                }
                return result
            }
        }
    }

//Função usada para resolver os parênteses:
    function solveParentheses(list = []) {
        let op = []
        let ipa
        let ipf
        let res_p
        while (count(list, '(') > 0) {
            ipa = list.lastIndexOf('(')
            op = list.slice(ipa, en.length)
            ipf = op.indexOf(')')
            op = op.slice(0, ipf + 1)
            let n_op = op.length
            op.pop()
            op.shift()
            validateExpression(op)
            res_p = resolution(op)
            list.splice(ipa, n_op, res_p)
        }
    }

//Função usada para resolver os números especiais ("pi" e "e"):
    function solveOthersNumbers(list = []) {
        for (let c = 0; c < list.length; c++) {
            if (list[c][0] == 'π') {
                let res_p = Math.PI
                list.splice(c, 1, res_p)
            }
            if (list[c][0] == 'e') {
                let res_p = Math.E
                list.splice(c, 1, res_p)
            }  
        }    
    }

//Função usada para resolver os operadores funcionais que ocorrerem na expressão:
    function solveFunctions(list = []) {
        while (true) {
            let cont = 0
            for (let element of list) {
                if (typeof element == 'object') {
                    cont++
                }
            }
            if (cont == 0) {
                break
            }
            for (let c = list.length - 1; c >= 0; c--) {
                if (typeof list[c] == 'object') {
                    if (list[c + 1] != '(') {
                        throw new Error('ERRO8! Expressão Inválida!')
                    }
                    let i = blockParenthesesClose(c + 1, list)
                    let l = list.slice(c + 2, i)
                    let n = l.length + 3
                    solveParentheses(l)
                    validateExpression(l)
                    let argument = resolution(l)
                    if (list[c][0] == 'sqrt') {
                        let res_p = argument ** 0.5
                        list.splice(c, n, res_p)
                        continue    
                    }
                    if (list[c][0] == 'fact') {
                        let res_p = factorial(argument)
                        list.splice(c, n, res_p)
                        continue    
                    }
                    if (list[c][0] == 'sin') {
                        let button_rad = document.getElementById('rad')
                        if (button_rad.value == 'RAD') {
                            argument = degConverterAdRad(argument)
                        }
                        let res_p = Math.sin(argument)
                        list.splice(c, n, res_p)
                        continue     
                    }
                    if (list[c][0] == 'asin') {
                        let button_rad = document.getElementById('rad')
                        let res_p = Math.asin(argument)
                        if (button_rad.value == 'RAD') {
                            res_p = radConverterAdDeg(res_p)  
                        }
                        list.splice(c, n, res_p)
                        continue     
                    }
                    if (list[c][0] == 'cos') {
                        let button_rad = document.getElementById('rad')
                        if (button_rad.value == 'RAD') {
                            argument = degConverterAdRad(argument)
                        }
                        let res_p = Math.cos(argument)
                        list.splice(c, n, res_p)
                        continue     
                    }
                    if (list[c][0] == 'acos') {
                        let button_rad = document.getElementById('rad')
                        let res_p = Math.acos(argument)
                        if (button_rad.value == 'RAD') {
                            res_p = radConverterAdDeg(res_p)  
                        }  
                        list.splice(c, n, res_p)
                        continue     
                    }
                    if (list[c][0] == 'tan') {
                        let button_rad = document.getElementById('rad')
                        if (button_rad.value == 'RAD') {
                            argument = degConverterAdRad(argument)
                        }
                        let res_p = Math.tan(argument)
                        list.splice(c, n, res_p)
                        continue
                    }
                    if (list[c][0] == 'atan') {
                        let button_rad = document.getElementById('rad')
                        let res_p = Math.atan(argument)
                        if (button_rad.value == 'RAD') {
                            res_p = radConverterAdDeg(res_p)  
                        }  
                        list.splice(c, n, res_p)
                        continue     
                    }
                    if (list[c][0] == 'ln') {
                        let res_p = Math.log(argument)
                        list.splice(c, n, res_p)
                        continue    
                    }
                    if (list[c][0] == 'log') {
                        let res_p = Math.log10(argument)
                        list.splice(c, n, res_p)
                        continue    
                    }
                    if (list[c][0] == 'abs') {
                        let res_p = Math.abs(argument)
                        list.splice(c, n, res_p)
                        continue    
                    }
                }
            }
        }
    }


//5. FUNÇÃO QUE RESOLVE A EXPRESSÃO INSERIDA (função resposta):
    function functionAnswer(list = []) {
        let npa = count(list, '(')
        let npf = count(list, ')')
        if ((npa - npf) == 1) { 
            if (list[list.length -1] == '(') {
                list.pop('(')
            } else {
                list.push(')')
            }
        }
        if ((npa - npf) > 1) {
            throw new Error(`Feche parênteses! ${npa - npf}x ")"`)
        }
        solveOthersNumbers(list)
        solveFunctions(list)
        solveParentheses(list)
        validateExpression(list)
        let answer = resolution(list)
        list.splice(0, 3, answer)
        let txtanswer = `<strong>${Number(answer.toFixed(12))}</strong>`
        writeInElement(res, txtanswer)
    }

//6. FUNÇÃO PRINCIPAL DE EXECUÇÃO (RESULTADO / "="):
    function answer() {
        try {
            functionAnswer(en)
        } catch (error) {
            alert(error.message)
        }
    }


//7. ADIÇÃO DE ENTRADAS PELO TECLADO:
    document.addEventListener('keyup', function(event) {
        switch(event.key) {
            case '0':
                number0()
                break
            case '1':
                number1()
                break
            case '2':
                number2()
                break
            case '3':
                number3()
                break
            case '4':
                number4()
                break
            case '5':
                number5()
                break
            case '6':
                number6()
                break
            case '7':
                number7()
                break
            case '8':
                number8()
                break
            case '9':
                number9()
                break
            case '.':
                point()
                break
            case ',':
                point()
                break
            case '+':
                sum()
                break
            case '-':
                subt()
                break
            case '*':
                multip()
                break
            case '/':
                division()
                break
            case 'Backspace':
                buttonDel()
                break
            case 'Escape':
                clean()
                break
            case 'Enter':
                answer()
                break
        }
    })