export default function ConvertDuration(duration: number) {
  // math.floor vai arredondar para baixo
  const hours = Math.floor(duration / (60 * 60));
  const minutes = Math.floor((duration % (60 * 60)) / 60);
  const seconds = duration % 60;

  // explicação no final do arquivo
  const finalResult = [hours, minutes, seconds].map((a) => String(a).padStart(2, "0")).join(":");

  return finalResult;
}

/** explicação da constante finalResult
 * map vai listar todos os dados
 * String vai converter eles em texto
 * padStart vai colocar um zero para quem não tiver dois dígitos
 * join vai adicionar dois pontos
 */
