
function Validator (selectorForm){
    var _this = this;
    function getParent(element,selector){
        while(element.parentElement){
            if (element.parentElement.matches(selector)){
                return element.parentElement;
            }
            element = element.parentElement;
        }
    }

    var formRules = {};

    var validatorRules = {
        required: function(value){
            return value.trim()?undefined: 'Vui lòng nhập trường này'
        },
        email: function(value){
            var regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            return regex.test(value)?undefined: 'Trường này phải là một Email'
        },
        min: function(min){
            return function(value){
                return value.length>=min?undefined:`Mật khẩu phải ${min} kí tự trở lên`
            }
        }
    }

    var formElement =  document.querySelector(selectorForm);
    if (formElement){
        var inputs = formElement.querySelectorAll('[name][rules]');
        for (var input of inputs){
            var rules = input.getAttribute('rules').split('|');
            for (var rule of rules){
                var ruleFunc;
                if (rule.includes(':')){
                    var ruleInfo = rule.split(':');
                    ruleFunc =  validatorRules[ruleInfo[0]](ruleInfo[1]);
                }else{
                    ruleFunc = validatorRules[rule];
                }

                if (Array.isArray(formRules[input.name])){
                    formRules[input.name].push(ruleFunc);
                }else{
                    formRules[input.name] = [ruleFunc];
                }
            }

            input.onblur = handleValidate;
            input.oninput = handleClearError;

            function handleValidate (e){
                var rules = formRules[e.target.name];
                var errorMessage;
                
                for (var rule of rules){
                    errorMessage = rule(e.target.value);
                    if(errorMessage){
                        break;
                    }
                }
            
                if (errorMessage){
                    var formGroup = getParent(e.target, '.form-group');
                    if (formGroup){
                        var formMessage =formGroup.querySelector('.form-message');
                        if (formMessage){
                            formMessage.innerText = errorMessage;
                        }
                        formGroup.classList.add('invalid');
                    }
                }
                return !errorMessage;
            }

            function handleClearError(e){
                var formGroup = getParent(e.target, '.form-group');
                if (formGroup.classList.contains('invalid')){
                    var formMessage = formGroup.querySelector('.form-message');
                    if (formMessage){
                        formMessage.innerText = '';
                    }
                    formGroup.classList.remove('invalid');
                }
            }
        }
    }

    formElement.onsubmit = function(e){
        e.preventDefault();
        var inputs = formElement.querySelectorAll('[name][rules]');
        var isValid = true;
        for (var input of inputs){
            if(!handleValidate({target:input})){
                isValid = false;
            }
        }
        if(isValid){
            if (typeof _this.onSubmit === 'function'){
                var enableInputs = formElement.querySelectorAll('[name]:not([disabled])');
                var formValues = Array.from(enableInputs).reduce((value,input)=>{
                    value[input.name] = input.value
                    return value;
                },{});
                _this.onSubmit(formValues);
            }else{
                formElement.submit();
            }
        }
    }
}