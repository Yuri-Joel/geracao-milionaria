import api from "./api";

export interface CadastroFormData {
    // User Type
    userType: "empresa" | "singular";

    // Step 1 - User data
    nome: string;
    telefone: string;
    confirmaTelefone: string;
    telefoneAlt: string;
    email: string;
    confirmaEmail: string;

    // Step 2 - Company data
    nomeEmpresa: string;
    nif: string;
    setorEconomico: string;
    codigoAlvara: string;
    dataValidadeAlvara: string;
    provincia: string;
    municipio: string;
    bairro: string;
    endereco: string;
    emailEmpresa: string;
    telefoneEmpresa: string;
    tipoPropriedade: string;
    filial: string;
    caixaPostalFilial: string;
    actividadeFilial: string;

    // Step 2 - Personal data
    bi: string;
    dataNascimento: string;
    enderecoPessoal: string;
    cidadePessoal: string;
    profissao: string;
    escolaridade: string;

    // Step 3 - Password
    password: string;
    confirmPassword: string;
    acceptTerms: boolean;
}

export interface ValidationError {
    field: string;
    message: string;
    type: "error" | "warning";
}

// Field-specific validators for Step 1
const validateNomeCompleto = (nome: string): ValidationError | null => {
    if (!nome?.trim()) {
        return { field: "nome", message: "Nome é obrigatório", type: "error" };
    }
    if (nome.trim().length < 5) {
        return { field: "nome", message: "Nome deve ter pelo menos 5 caracteres", type: "error" };
    }
    if (nome.trim().length > 100) {
        return { field: "nome", message: "Nome não pode exceder 100 caracteres", type: "error" };
    }
    const words = nome.trim().split(/\s+/);
    if (words.length < 2) {
        return { field: "nome", message: "Nome deve conter pelo menos 2 palavras", type: "error" };
    }
    if (!/^[a-zA-ZÀ-ÿ\s'-]+$/.test(nome)) {
        return { field: "nome", message: "Nome contém caracteres inválidos", type: "error" };
    }
    return null;
};

const validateTelefone = (telefone: string, confirmTelefone?: string): ValidationError | null => {
    if (!telefone?.trim()) {
        return { field: "telefone", message: "Telemóvel é obrigatório", type: "error" };
    }
    const digitos = telefone.replace(/\D/g, "");
    if (digitos.length < 9 || digitos.length > 15) {
        return { field: "telefone", message: "Telemóvel deve ter entre 9 e 15 dígitos", type: "error" };
    }
    if (!digitos.startsWith("244") && digitos.length === 12) {
        return { field: "telefone", message: "Número parece ser de Angola. Considere incluir o código do país", type: "warning" };
    }
    if (confirmTelefone && telefone !== confirmTelefone) {
        return { field: "confirmaTelefone", message: "Telemóveis não coincidem", type: "error" };
    }
    return null;
};

const validateEmail = (email: string, confirmEmail?: string): ValidationError | null => {
    if (!email?.trim()) {
        return null; // Email é opcional no passo 1
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return { field: "email", message: "Formato de email inválido", type: "error" };
    }
    const domain = email.split("@")[1]?.toLowerCase();
    const commonDomains = ["gmail.com", "outlook.com", "hotmail.com", "yahoo.com", "pt.com", "co.pt"];
    if (domain && !commonDomains.includes(domain)) {
        return { field: "email", message: "Domínio de email desconhecido. Verifique se está correto", type: "warning" };
    }
    if (confirmEmail && email !== confirmEmail) {
        return { field: "confirmaEmail", message: "E-mails não coincidem", type: "error" };
    }
    return null;
};

// Field-specific validators for Step 2
const validateNomeEmpresa = (nomeEmpresa: string): ValidationError | null => {
    if (!nomeEmpresa?.trim()) {
        return { field: "nomeEmpresa", message: "Nome da empresa é obrigatório", type: "error" };
    }
    if (nomeEmpresa.trim().length < 3) {
        return { field: "nomeEmpresa", message: "Nome da empresa deve ter pelo menos 3 caracteres", type: "error" };
    }
    if (nomeEmpresa.trim().length > 150) {
        return { field: "nomeEmpresa", message: "Nome da empresa não pode exceder 150 caracteres", type: "error" };
    }
    return null;
};

const validateNIF = (nif: string): ValidationError | null => {
    if (!nif?.trim()) {
        return { field: "nif", message: "NIF é obrigatório", type: "error" };
    }
    const digitos = nif.replace(/\D/g, "");
    if (digitos.length !== 10) {
        return { field: "nif", message: "NIF deve ter 10 dígitos", type: "error" };
    }
    return null;
};

const validateCodigoAlvara = (codigo: string): ValidationError | null => {
    if (!codigo?.trim()) {
        return { field: "codigoAlvara", message: "Código do alvará é obrigatório", type: "error" };
    }
    if (codigo.trim().length < 5) {
        return { field: "codigoAlvara", message: "Código do alvará parece incompleto", type: "warning" };
    }
    return null;
};

const validateDataAlvara = (data: string): ValidationError | null => {
    if (!data?.trim()) {
        return { field: "dataValidadeAlvara", message: "Data de validade é obrigatória", type: "error" };
    }
    const dataObj = new Date(data);
    const hoje = new Date();
    if (dataObj < hoje) {
        return { field: "dataValidadeAlvara", message: "Alvará expirado. Por favor, renove", type: "error" };
    }
    const diferencaMaxima = new Date();
    diferencaMaxima.setFullYear(hoje.getFullYear() + 50);
    if (dataObj > diferencaMaxima) {
        return { field: "dataValidadeAlvara", message: "Data parece inválida (muito no futuro)", type: "warning" };
    }
    return null;
};

const validateTelefoneEmpresa = (telefone: string): ValidationError | null => {
    if (!telefone?.trim()) {
        return { field: "telefoneEmpresa", message: "Telefone da empresa é obrigatório", type: "error" };
    }
    const digitos = telefone.replace(/\D/g, "");
    if (digitos.length < 9 || digitos.length > 15) {
        return { field: "telefoneEmpresa", message: "Telefone deve ter entre 9 e 15 dígitos", type: "error" };
    }
    return null;
};

const validateBI = (bi: string): ValidationError | null => {
    if (!bi?.trim()) {
        return { field: "bi", message: "Número do BI é obrigatório", type: "error" };
    }
    const biUpperCase = bi.toUpperCase();
    if (!/^\d{9}[A-Z]{2}\d{3}$/.test(biUpperCase)) {
        return { field: "bi", message: "Formato do BI inválido (ex: 123456789AB001)", type: "error" };
    }
    return null;
};

const validateDataNascimento = (data: string): ValidationError | null => {
    if (!data?.trim()) {
        return { field: "dataNascimento", message: "Data de nascimento é obrigatória", type: "error" };
    }
    const dataObj = new Date(data);
    const hoje = new Date();
    const idade = hoje.getFullYear() - dataObj.getFullYear();
    if (idade < 18) {
        return { field: "dataNascimento", message: "Deve ter pelo menos 18 anos", type: "error" };
    }
    if (idade > 120) {
        return { field: "dataNascimento", message: "Data de nascimento parece inválida", type: "error" };
    }
    return null;
};

const validateEndereco = (endereco: string): ValidationError | null => {
    if (!endereco?.trim()) {
        return { field: "enderecoPessoal", message: "Endereço é obrigatório", type: "error" };
    }
    if (endereco.trim().length < 5) {
        return { field: "enderecoPessoal", message: "Endereço deve ter pelo menos 5 caracteres", type: "error" };
    }
    if (endereco.trim().length > 200) {
        return { field: "enderecoPessoal", message: "Endereço não pode exceder 200 caracteres", type: "error" };
    }
    return null;
};

const validateCidade = (cidade: string): ValidationError | null => {
    if (!cidade?.trim()) {
        return { field: "cidadePessoal", message: "Cidade é obrigatória", type: "error" };
    }
    if (cidade.trim().length < 3) {
        return { field: "cidadePessoal", message: "Nome da cidade deve ter pelo menos 3 caracteres", type: "error" };
    }
    return null;
};

const validateProfissao = (profissao: string): ValidationError | null => {
    if (!profissao?.trim()) {
        return { field: "profissao", message: "Profissão é obrigatória", type: "error" };
    }
    if (profissao.trim().length < 2) {
        return { field: "profissao", message: "Profissão deve ter pelo menos 2 caracteres", type: "error" };
    }
    return null;
};

// Field-specific validators for Step 3
const validatePassword = (password: string): ValidationError | null => {
    if (!password?.trim()) {
        return { field: "password", message: "Palavra-passe é obrigatória", type: "error" };
    }
    if (password.length < 8) {
        return { field: "password", message: "Palavra-passe deve ter pelo menos 8 caracteres", type: "error" };
    }
    if (!/[A-Z]/.test(password)) {
        return { field: "password", message: "Palavra-passe deve conter pelo menos uma letra maiúscula", type: "error" };
    }
    if (!/[a-z]/.test(password)) {
        return { field: "password", message: "Palavra-passe deve conter pelo menos uma letra minúscula", type: "error" };
    }
    if (!/[0-9]/.test(password)) {
        return { field: "password", message: "Palavra-passe deve conter pelo menos um número", type: "error" };
    }
    if (!/[!@#$%^&*()_+\-=\[\]{};:'",.<>?]/.test(password)) {
        return { field: "password", message: "Palavra-passe deve conter pelo menos um caractere especial", type: "warning" };
    }
    return null;
};

const validatePasswordConfirmation = (password: string, confirmPassword: string): ValidationError | null => {
    if (!confirmPassword?.trim()) {
        return { field: "confirmPassword", message: "Confirmação de palavra-passe é obrigatória", type: "error" };
    }
    if (password !== confirmPassword) {
        return { field: "confirmPassword", message: "Palavras-passe não coincidem", type: "error" };
    }
    return null;
};

// Main validation functions
export const validateStep1 = (formData: CadastroFormData): ValidationError[] => {
    const validationErrors: ValidationError[] = [];

    const nomeError = validateNomeCompleto(formData.nome);
    if (nomeError) validationErrors.push(nomeError);

    const telefoneError = validateTelefone(formData.telefone, formData.confirmaTelefone);
    if (telefoneError) validationErrors.push(telefoneError);

    const emailError = validateEmail(formData.email, formData.confirmaEmail);
    if (emailError) validationErrors.push(emailError);

    return validationErrors;
};

export const validateStep2 = (
    formData: CadastroFormData,
    userType: "empresa" | "singular" | null
): ValidationError[] => {
    const validationErrors: ValidationError[] = [];

    if (userType === "empresa") {
        const nomeEmpresaError = validateNomeEmpresa(formData.nomeEmpresa);
        if (nomeEmpresaError) validationErrors.push(nomeEmpresaError);

        const nifError = validateNIF(formData.nif);
        if (nifError) validationErrors.push(nifError);

        if (!formData.setorEconomico?.trim()) {
            validationErrors.push({ field: "setorEconomico", message: "Sector económico é obrigatório", type: "error" });
        }

        const codigoError = validateCodigoAlvara(formData.codigoAlvara);
        if (codigoError) validationErrors.push(codigoError);

        const dataError = validateDataAlvara(formData.dataValidadeAlvara);
        if (dataError) validationErrors.push(dataError);

        if (!formData.provincia?.trim()) {
            validationErrors.push({ field: "provincia", message: "Província é obrigatória", type: "error" });
        }

        if (!formData.municipio?.trim()) {
            validationErrors.push({ field: "municipio", message: "Município é obrigatório", type: "error" });
        }

        const enderecoError = validateEndereco(formData.endereco);
        if (enderecoError) {
            enderecoError.field = "endereco";
            validationErrors.push(enderecoError);
        }

        const emailEmpresaError = validateEmail(formData.emailEmpresa);
        if (emailEmpresaError) {
            emailEmpresaError.field = "emailEmpresa";
            validationErrors.push(emailEmpresaError);
        } else if (!formData.emailEmpresa?.trim()) {
            validationErrors.push({ field: "emailEmpresa", message: "Email da empresa é obrigatório", type: "error" });
        }

        const telefoneError = validateTelefoneEmpresa(formData.telefoneEmpresa);
        if (telefoneError) validationErrors.push(telefoneError);
    } else {
        const biError = validateBI(formData.bi);
        if (biError) validationErrors.push(biError);

        const dataNascimentoError = validateDataNascimento(formData.dataNascimento);
        if (dataNascimentoError) validationErrors.push(dataNascimentoError);

        const enderecoError = validateEndereco(formData.enderecoPessoal);
        if (enderecoError) validationErrors.push(enderecoError);

        const cidadeError = validateCidade(formData.cidadePessoal);
        if (cidadeError) validationErrors.push(cidadeError);

        const profissaoError = validateProfissao(formData.profissao);
        if (profissaoError) validationErrors.push(profissaoError);
    }

    return validationErrors;
};

export const validateStep3 = (formData: CadastroFormData): ValidationError[] => {
    const validationErrors: ValidationError[] = [];

    const passwordError = validatePassword(formData.password);
    if (passwordError) validationErrors.push(passwordError);

    const confirmPasswordError = validatePasswordConfirmation(formData.password, formData.confirmPassword);
    if (confirmPasswordError) validationErrors.push(confirmPasswordError);

    if (!formData.acceptTerms) {
        validationErrors.push({ field: "acceptTerms", message: "Deve aceitar os termos e condições", type: "error" });
    }

    return validationErrors;
};

export const submitCadastro = async (formData: CadastroFormData) => {
    try {
        const response = await api.post("/cadastro", formData);
        return response.data;
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(`Erro ao enviar cadastro: ${error.message}`);
        }
        throw error;
    }
};

// Validate a single field using existing validators
export const validateField = (
    field: string,
    formData: CadastroFormData,
    userType: "empresa" | "singular" | null = null
): ValidationError | null => {
    let err: ValidationError | null = null;

    switch (field) {
        // Step 1
        case "nome":
            err = validateNomeCompleto(formData.nome);
            break;
        case "telefone":
        case "confirmaTelefone":
            err = validateTelefone(formData.telefone, formData.confirmaTelefone);
            if (err && field === "confirmaTelefone") err.field = "confirmaTelefone";
            break;
        case "telefoneAlt":
            // optional: validate if provided
            if (formData.telefoneAlt?.trim()) {
                const d = formData.telefoneAlt.replace(/\D/g, "");
                if (d.length < 9) err = { field, message: "Telemóvel alternativo inválido", type: "warning" };
            }
            break;
        case "email":
        case "confirmaEmail":
            err = validateEmail(formData.email, formData.confirmaEmail);
            if (err && field === "confirmaEmail") err.field = "confirmaEmail";
            // if email provided, require confirmation
            if (!err && formData.email?.trim() && !formData.confirmaEmail?.trim()) {
                err = { field: "confirmaEmail", message: "Confirmação de e-mail é necessária", type: "error" };
            }
            break;

        // Step 2 - empresa
        case "nomeEmpresa":
            err = validateNomeEmpresa(formData.nomeEmpresa);
            break;
        case "nif":
            err = validateNIF(formData.nif);
            break;
        case "setorEconomico":
            if (!formData.setorEconomico?.trim()) err = { field, message: "Sector económico é obrigatório", type: "error" };
            break;
        case "codigoAlvara":
            err = validateCodigoAlvara(formData.codigoAlvara);
            break;
        case "dataValidadeAlvara":
            err = validateDataAlvara(formData.dataValidadeAlvara);
            break;
        case "provincia":
            if (!formData.provincia?.trim()) err = { field, message: "Província é obrigatória", type: "error" };
            break;
        case "municipio":
            if (!formData.municipio?.trim()) err = { field, message: "Município é obrigatório", type: "error" };
            break;
        case "endereco":
            err = validateEndereco(formData.endereco);
            if (err) err.field = "endereco";
            break;
        case "emailEmpresa":
            err = validateEmail(formData.emailEmpresa);
            if (err) err.field = "emailEmpresa";
            else if (!formData.emailEmpresa?.trim()) err = { field, message: "Email da empresa é obrigatório", type: "error" };
            break;
        case "telefoneEmpresa":
            err = validateTelefoneEmpresa(formData.telefoneEmpresa);
            break;

        // Step 2 - singular
        case "bi":
            err = validateBI(formData.bi);
            break;
        case "dataNascimento":
            err = validateDataNascimento(formData.dataNascimento);
            break;
        case "enderecoPessoal":
            err = validateEndereco(formData.enderecoPessoal);
            break;
        case "cidadePessoal":
            err = validateCidade(formData.cidadePessoal);
            break;
        case "profissao":
            err = validateProfissao(formData.profissao);
            break;

        // Step 3
        case "password":
            err = validatePassword(formData.password);
            break;
        case "confirmPassword":
            err = validatePasswordConfirmation(formData.password, formData.confirmPassword);
            break;
        case "acceptTerms":
            if (!formData.acceptTerms) err = { field, message: "Deve aceitar os termos e condições", type: "error" };
            break;

        default:
            err = null;
    }

    if (err) return err;
    return null;
};
