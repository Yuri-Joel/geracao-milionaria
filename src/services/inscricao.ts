import api from "./api";

export interface InscricaoFormData {
    nomeCompleto: string;
    numeroContribuinte: string;
    numeroBilhete: string;
    possuiEmpresa: string;
    nomeEmpresa: string;
    empresaProcesso: string;
    empresaConcluida: string;
    numeroAlvara: string;
    enderecoEmpresa: string;
    municipio: string;
    telefone: string;
    possuiSite: string;
    atividadeEconomica: string;
    tipoSociedade: string;
    setorAtividade: string;
    provincia: string;
    email: string;
    classificacao: string;
    foto: File | null;
    observacoes: string;
}

export interface ValidationError {
    field: string;
    message: string;
    type: "error" | "warning";
}

export const submitInscricao = async (formData: InscricaoFormData) => {
    try {
        const data = new FormData();

        // Adicionar campos de texto
        Object.entries(formData).forEach(([key, value]) => {
            if (key !== "foto" && value !== null) {
                data.append(key, String(value));
            }
        });

        if (formData.foto) {
            data.append("foto", formData.foto);
        }

        // requisição
        const response = await api.post("/inscricao", data, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });

        return response.data;
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(`Erro ao enviar inscrição: ${error.message}`);
        }
        throw error;
    }
};


const validateNomeCompleto = (nome: string): { valid: boolean; message: string; type: "error" | "warning" } => {
    const trimmed = nome.trim();

    if (!trimmed) {
        return {
            valid: false,
            message: "Nome completo é obrigatório",
            type: "error",
        };
    }

    if (trimmed.length < 5) {
        return {
            valid: false,
            message: "Nome deve ter pelo menos 5 caracteres",
            type: "error",
        };
    }

    if (trimmed.length > 150) {
        return {
            valid: false,
            message: "Nome não pode exceder 150 caracteres",
            type: "error",
        };
    }

    const wordCount = trimmed.split(/\s+/).filter(w => w.length > 0).length;
    if (wordCount < 2) {
        return {
            valid: false,
            message: "Nome deve conter pelo menos 2 palavras (nome e sobrenome)",
            type: "error",
        };
    }

    if (!/^[a-záàâãéèêíïóôõöúçñ\s'-]+$/i.test(trimmed)) {
        return {
            valid: false,
            message: "Nome contém caracteres inválidos (apenas letras, espaços, apóstrofos e hífens são permitidos)",
            type: "error",
        };
    }

    if (wordCount > 10) {
        return {
            valid: false,
            message: "Nome com número excessivo de palavras. Verifique se está correto",
            type: "warning",
        };
    }

    return { valid: true, message: "", type: "error" };
};

const validateNIF = (nif: string): { valid: boolean; message: string; type: "error" | "warning" } => {
    const cleanedNIF = nif.trim().replace(/\D/g, "");

    if (!cleanedNIF) {
        return {
            valid: false,
            message: "Número de contribuinte é obrigatório",
            type: "error",
        };
    }

    if (cleanedNIF.length !== 10) {
        return {
            valid: false,
            message: `NIF/Contribuinte deve ter exatamente 10 dígitos (você digitou ${cleanedNIF.length})`,
            type: "error",
        };
    }

    if (!/^\d{10}$/.test(cleanedNIF)) {
        return {
            valid: false,
            message: "NIF deve conter apenas números",
            type: "error",
        };
    }

    if (cleanedNIF.startsWith("000")) {
        return {
            valid: false,
            message: "NIF inválido (começa com 000)",
            type: "error",
        };
    }

    return { valid: true, message: "", type: "error" };
};

const validateBI = (bi: string): { valid: boolean; message: string; type: "error" | "warning" } => {
    const biRegex = /^(\d{9})([A-Z]{2})(\d{3})$/i;
    const upperBI = bi.trim().toUpperCase();

    if (!upperBI) {
        return {
            valid: false,
            message: "Número do bilhete de identidade é obrigatório",
            type: "error",
        };
    }

    if (!biRegex.test(upperBI)) {
        return {
            valid: false,
            message: "Formato do BI inválido. Use o formato: 9 dígitos + 2 letras + 3 dígitos (ex: 007746258LA032)",
            type: "error",
        };
    }

    const matches = upperBI.match(biRegex);
    if (!matches) {
        return {
            valid: false,
            message: "Número do BI não pode ser processado",
            type: "error",
        };
    }

    const [, sequencial, provincia] = matches;

    const provinciasAngola = [
        "LU", "BE", "BI", "CA", "CC", "CN", "CS", "CU",
        "HU", "HI", "LN", "LS", "MA", "MO", "NA", "UI", "ZA", "LA",
    ];

    if (!provinciasAngola.includes(provincia)) {
        return {
            valid: false,
            message: `Código de província "${provincia}" inválido. Use um código válido de Angola (LA, BE, LU, HU, etc.)`,
            type: "warning",
        };
    }

    if (sequencial === "000000000") {
        return {
            valid: false,
            message: "Número de sequência do BI inválido",
            type: "error",
        };
    }

    return { valid: true, message: "", type: "error" };
};

const validateTelefone = (telefone: string): { valid: boolean; message: string; type: "error" | "warning" } => {
    const cleanedPhone = telefone.trim().replace(/\D/g, "");

    if (!cleanedPhone) {
        return {
            valid: false,
            message: "Telefone é obrigatório",
            type: "error",
        };
    }

    if (cleanedPhone.length < 9) {
        return {
            valid: false,
            message: `Telefone deve ter pelo menos 9 dígitos (você digitou ${cleanedPhone.length})`,
            type: "error",
        };
    }

    if (cleanedPhone.length > 15) {
        return {
            valid: false,
            message: "Número de telefone muito longo (máximo 15 dígitos)",
            type: "error",
        };
    }


    const isValidAngola = cleanedPhone.startsWith("9") || cleanedPhone.startsWith("244");

    if (!isValidAngola) {
        return {
            valid: false,
            message: "Telefone parece ser inválido para Angola. Deve começar com 9 ou 244",
            type: "warning",
        };
    }

    if (cleanedPhone.startsWith("9") && cleanedPhone.length !== 9 && cleanedPhone.length !== 12) {
        return {
            valid: false,
            message: "Formato de telefone inválido. Deve ter 9 dígitos ou 12 (com código 244)",
            type: "warning",
        };
    }

    return { valid: true, message: "", type: "error" };
};

const validateEmail = (email: string): { valid: boolean; message: string; type: "error" | "warning" } => {
    const trimmed = email.trim();

    if (!trimmed) {
        return {
            valid: false,
            message: "Email é obrigatório",
            type: "error",
        };
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(trimmed)) {
        return {
            valid: false,
            message: "Formato de email inválido (ex: usuario@dominio.com)",
            type: "error",
        };
    }

    if (trimmed.length > 254) {
        return {
            valid: false,
            message: "Email muito longo (máximo 254 caracteres)",
            type: "error",
        };
    }

    const domain = trimmed.split("@")[1]?.toLowerCase();

    if (domain && domain.length < 4) {
        return {
            valid: false,
            message: "Domínio de email parece ser muito curto",
            type: "warning",
        };
    }

    const commonDomains = [
        "gmail.com", "hotmail.com", "outlook.com", "yahoo.com",
        "hotmail.pt", "gmail.pt", "outlook.pt"
    ];

    if (domain && !commonDomains.includes(domain) && !domain.endsWith(".pt") && !domain.endsWith(".ao")) {
        return {
            valid: false,
            message: "Domínio de email é desconhecido. Verifique se digitou corretamente",
            type: "warning",
        };
    }

    if (trimmed.includes("..") || trimmed.startsWith(".") || trimmed.endsWith(".")) {
        return {
            valid: false,
            message: "Email contém caracteres inválidos (pontos consecutivos ou nas extremidades)",
            type: "error",
        };
    }

    return { valid: true, message: "", type: "error" };
};

const validateFoto = (foto: File): { valid: boolean; message: string; type: "error" | "warning" } => {
    const maxSize = 5 * 1024 * 1024; // 5MB
    const minSize = 10 * 1024; // 10KB
    const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/jpg"];

    if (!foto) {
        return {
            valid: false,
            message: "Foto é obrigatória",
            type: "error",
        };
    }

    if (!allowedTypes.includes(foto.type)) {
        return {
            valid: false,
            message: `Formato de imagem não suportado: ${foto.type}. Use JPEG, PNG ou WebP`,
            type: "error",
        };
    }

    if (foto.size < minSize) {
        return {
            valid: false,
            message: `Imagem muito pequena (${(foto.size / 1024).toFixed(2)}KB). Tamanho mínimo: 10KB`,
            type: "error",
        };
    }

    if (foto.size > maxSize) {
        return {
            valid: false,
            message: `Imagem muito grande (${(foto.size / 1024 / 1024).toFixed(2)}MB). Tamanho máximo: 5MB`,
            type: "error",
        };
    }

    const allowedExtensions = [".jpg", ".jpeg", ".png", ".webp"];
    const fileName = foto.name.toLowerCase();
    const hasValidExtension = allowedExtensions.some(ext => fileName.endsWith(ext));

    if (!hasValidExtension) {
        return {
            valid: false,
            message: "Nome de arquivo inválido. Use extensão .jpg, .jpeg, .png ou .webp",
            type: "warning",
        };
    }

    return { valid: true, message: "", type: "error" };
};

const validateURL = (url: string): { valid: boolean; message: string; type: "error" | "warning" } => {
    const trimmed = url.trim();

    if (!trimmed) {
        return {
            valid: false,
            message: "URL é obrigatória se preenchida",
            type: "error",
        };
    }

    // Auto-adicionar protocolo se não tiver
    const urlWithProtocol = trimmed.startsWith("http") ? trimmed : `https://${trimmed}`;

    try {
        const urlObj = new URL(urlWithProtocol);

        // Validação de domínio
        const hostname = urlObj.hostname;

        if (!hostname.includes(".")) {
            return {
                valid: false,
                message: "URL deve conter um domínio válido (ex: www.exemplo.com)",
                type: "error",
            };
        }

        // Validação para .ao (domínio de Angola)
        if (!hostname.endsWith(".ao") && !hostname.endsWith(".com") && !hostname.endsWith(".pt") && !hostname.endsWith(".org")) {
            return {
                valid: false,
                message: `Extensão de domínio desconhecida (.${hostname.split(".").pop()}). Considere usar .ao, .com, .pt ou .org`,
                type: "warning",
            };
        }

        return { valid: true, message: "", type: "error" };
    } catch {
        return {
            valid: false,
            message: "URL inválida. Exemplo correto: https://www.seusite.com ou www.seusite.com",
            type: "error",
        };
    }
};

export const validateInscricaoForm = (formData: InscricaoFormData): ValidationError[] => {
    const errors: ValidationError[] = [];

    if (!formData.nomeCompleto?.trim()) {
        errors.push({
            field: "nomeCompleto",
            message: "Nome completo é obrigatório",
            type: "error",
        });
    } else {
        const nameValidation = validateNomeCompleto(formData.nomeCompleto);
        if (!nameValidation.valid) {
            errors.push({
                field: "nomeCompleto",
                message: nameValidation.message,
                type: nameValidation.type,
            });
        }
    }

    if (!formData.numeroContribuinte?.trim()) {
        errors.push({
            field: "numeroContribuinte",
            message: "Número de contribuinte é obrigatório",
            type: "error",
        });
    } else {
        const nifValidation = validateNIF(formData.numeroContribuinte);
        if (!nifValidation.valid) {
            errors.push({
                field: "numeroContribuinte",
                message: nifValidation.message,
                type: nifValidation.type,
            });
        }
    }

    if (!formData.numeroBilhete?.trim()) {
        errors.push({
            field: "numeroBilhete",
            message: "Número do bilhete de identidade é obrigatório",
            type: "error",
        });
    } else {
        const biValidation = validateBI(formData.numeroBilhete);
        if (!biValidation.valid) {
            errors.push({
                field: "numeroBilhete",
                message: biValidation.message,
                type: biValidation.type,
            });
        }
    }

    if (!formData.telefone?.trim()) {
        errors.push({
            field: "telefone",
            message: "Telefone é obrigatório",
            type: "error",
        });
    } else {
        const phoneValidation = validateTelefone(formData.telefone);
        if (!phoneValidation.valid) {
            errors.push({
                field: "telefone",
                message: phoneValidation.message,
                type: phoneValidation.type,
            });
        }
    }

    if (!formData.email?.trim()) {
        errors.push({
            field: "email",
            message: "Email é obrigatório",
            type: "error",
        });
    } else {
        const emailValidation = validateEmail(formData.email);
        if (!emailValidation.valid) {
            errors.push({
                field: "email",
                message: emailValidation.message,
                type: emailValidation.type,
            });
        }
    }

    if (!formData.classificacao?.trim() || formData.classificacao.includes("Selecione")) {
        errors.push({
            field: "classificacao",
            message: "Selecione uma classificação válida",
            type: "error",
        });
    }

    if (formData.possuiEmpresa === "Sim") {
        if (!formData.nomeEmpresa?.trim()) {
            errors.push({
                field: "nomeEmpresa",
                message: "Nome da empresa é obrigatório quando selecionado 'Sim'",
                type: "error",
            });
        } else if (formData.nomeEmpresa.trim().length < 3) {
            errors.push({
                field: "nomeEmpresa",
                message: "Nome da empresa deve ter pelo menos 3 caracteres",
                type: "error",
            });
        }

        if (!formData.numeroAlvara?.trim()) {
            errors.push({
                field: "numeroAlvara",
                message: "Número do alvará é obrigatório quando selecionado 'Sim'",
                type: "error",
            });
        } else if (!/^\d{3,20}$/.test(formData.numeroAlvara.replace(/\D/g, ""))) {
            errors.push({
                field: "numeroAlvara",
                message: "Número do alvará deve conter apenas números",
                type: "error",
            });
        }

        if (!formData.enderecoEmpresa?.trim()) {
            errors.push({
                field: "enderecoEmpresa",
                message: "Endereço da empresa é obrigatório quando selecionado 'Sim'",
                type: "error",
            });
        } else if (formData.enderecoEmpresa.trim().length < 5) {
            errors.push({
                field: "enderecoEmpresa",
                message: "Endereço da empresa deve ser mais detalhado (mínimo 5 caracteres)",
                type: "error",
            });
        }

        if (!formData.setorAtividade?.trim() || formData.setorAtividade.includes("Selecione")) {
            errors.push({
                field: "setorAtividade",
                message: "Selecione um setor de atividade para a empresa",
                type: "error",
            });
        }
    }

    if (formData.foto) {
        const fotoValidation = validateFoto(formData.foto);
        if (!fotoValidation.valid) {
            errors.push({
                field: "foto",
                message: fotoValidation.message,
                type: fotoValidation.type,
            });
        }
    }

    if (formData.possuiSite?.trim()) {
        if (formData.possuiSite.trim().toLowerCase() === "sim" || formData.possuiSite.includes("http") || formData.possuiSite.includes("www")) {
            const urlValidation = validateURL(formData.possuiSite);
            if (!urlValidation.valid) {
                errors.push({
                    field: "possuiSite",
                    message: urlValidation.message,
                    type: urlValidation.type,
                });
            }
        }
    }

    return errors;
};