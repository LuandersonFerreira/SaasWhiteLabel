export const mockInvitesList = [
  {
    name: "Convite para Familiares",
    description: "Confirmação de presença para o casamento",
    questions: [
      {
        questionName: "Qual seu nome?",
        required: true,
        questionType: "text",
      },
      {
        questionName: "Você virá acompanhado?",
        required: true,
        questionType: "multiple",
        answers: ["Sim", "Não"],
      },
      {
        questionName: "Restrições alimentares?",
        required: false,
        questionType: "checkbox",
        answers: ["Vegetariano", "Sem glúten", "Outros"],
      },
    ],
    sent: "150",
    answered: "120",
  },
  {
    name: "Convite para Fornecedores",
    description: "Informações logísticas para fornecedores do evento",
    questions: [
      {
        questionName: "Nome da empresa",
        required: true,
        questionType: "text",
      },
      {
        questionName: "Tipo de serviço",
        required: true,
        questionType: "list",
        answers: ["Buffet", "Decoração", "Som e luz", "Outros"],
      },
      {
        questionName: "Necessita de estrutura adicional?",
        required: false,
        questionType: "multiple",
        answers: ["Mesa extra", "Tomada elétrica", "Nenhuma"],
      },
    ],
    sent: "125",
    answered: "100",
  },
  {
    name: "Convite para Equipe de Organização",
    description: "Formulário para membros da equipe que irão ajudar no evento",
    questions: [
      {
        questionName: "Nome completo",
        required: true,
        questionType: "text",
      },
      {
        questionName: "Qual função exercerá no evento?",
        required: true,
        questionType: "list",
        answers: [
          "Recepção",
          "Suporte técnico",
          "Acompanhamento dos noivos",
          "Outro",
        ],
      },
      {
        questionName: "Disponibilidade de horário",
        required: false,
        questionType: "text",
      },
    ],
    sent: "50",
    answered: "20",
  },
];
