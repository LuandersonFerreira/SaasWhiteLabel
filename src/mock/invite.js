export const mockInvite = {
  name: "Novo Convite",
  description: "Descrição do convite",
  questions: [
    {
      questionName: "Pergunta 1",
      required: true,
      questionType: "text",
    },
    {
      questionName: "Pergunta 2",
      required: true,
      questionType: "multiple",
      answers: ["Opção 1", "Opção 2"],
    },
    {
      questionName: "Pergunta 3",
      required: true,
      questionType: "checkbox",
      answers: ["Opção 1", "Opção 2"],
    },
    {
      questionName: "Pergunta 4",
      required: false,
      questionType: "list",
      answers: ["Opção 1", "Opção 2"],
    },
  ],
};
