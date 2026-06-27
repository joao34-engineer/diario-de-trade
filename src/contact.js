// ==========================================
// 7. LÓGICA DO CONTATO E VALIDAÇÃO CUSTOMIZADA
// ==========================================

const formContact = document.getElementById("form-contato");

if (formContact) {
  const inputName = document.getElementById("input-contato-nome");
  const inputEmail = document.getElementById("input-contato-email");
  const inputMessage = document.getElementById("input-contato-mensagem");

  const errorName = document.getElementById("error-contato-nome");
  const errorEmail = document.getElementById("error-contato-email");
  const errorMessage = document.getElementById("error-contato-mensagem");
  const successMessage = document.getElementById("success-contato");

  // Regex para validação de e-mail
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  formContact.addEventListener("submit", (event) => {
    event.preventDefault(); // Impede o envio padrão do formulário

    let hasErrors = false;

    // Reseta todos os erros anteriores antes de validar novamente
    resetErrors();

    // 1. Validação de Nome
    const nameVal = inputName.value.trim();
    if (!nameVal) {
      showError(inputName, errorName, "O nome completo é obrigatório.");
      hasErrors = true;
    } else if (nameVal.length < 3) {
      showError(inputName, errorName, "O nome deve conter pelo menos 3 caracteres.");
      hasErrors = true;
    }

    // 2. Validação de E-mail
    const emailVal = inputEmail.value.trim();
    if (!emailVal) {
      showError(inputEmail, errorEmail, "O e-mail é obrigatório.");
      hasErrors = true;
    } else if (!emailRegex.test(emailVal)) {
      showError(inputEmail, errorEmail, "Por favor, digite um e-mail válido.");
      hasErrors = true;
    }

    // 3. Validação de Mensagem
    const messageVal = inputMessage.value.trim();
    if (!messageVal) {
      showError(inputMessage, errorMessage, "A mensagem é obrigatória.");
      hasErrors = true;
    } else if (messageVal.length < 10) {
      showError(inputMessage, errorMessage, "A mensagem deve conter pelo menos 10 caracteres.");
      hasErrors = true;
    }

    // Se houver algum erro de validação, para o fluxo aqui
    if (hasErrors) return;

    // Se tudo estiver correto, simula o envio com sucesso
    successMessage.style.display = "block";
    formContact.reset();

    // Oculta o aviso de sucesso após 5 segundos
    setTimeout(() => {
      successMessage.style.display = "none";
    }, 5000);
  });

  // Funções Auxiliares
  function showError(inputElement, errorElement, message) {
    inputElement.closest(".form-group").classList.add("has-error");
    errorElement.textContent = message;
    errorElement.style.display = "block";
  }

  function resetErrors() {
    const groups = formContact.querySelectorAll(".form-group");
    groups.forEach(group => group.classList.remove("has-error"));

    const errors = formContact.querySelectorAll(".error-message");
    errors.forEach(err => {
      err.textContent = "";
      err.style.display = "none";
    });

    successMessage.style.display = "none";
  }

  // Remove a marcação de erro reativamente conforme o usuário digita nos campos
  inputName.addEventListener("input", () => cleanFieldError(inputName, errorName));
  inputEmail.addEventListener("input", () => cleanFieldError(inputEmail, errorEmail));
  inputMessage.addEventListener("input", () => cleanFieldError(inputMessage, errorMessage));

  function cleanFieldError(inputElement, errorElement) {
    inputElement.closest(".form-group").classList.remove("has-error");
    errorElement.textContent = "";
    errorElement.style.display = "none";
  }
}
