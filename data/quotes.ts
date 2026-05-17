export const quotes = [
  {
    text: "La vida es una flor de la cual el amor es la miel."
  },
  {
    text: "Eres mi flor favorita en el jardín de mis días."
  },
  {
    text: "No hay flor tan bella como aquella que crece entre espinas."
  },
  {
    text: "Tú eres la razón por la cual el cielo es azul."
  },
  {
    text: "En tu sonrisa veo los colores de todas las flores del mundo."
  },
  {
    text: "Cada día contigo es un pétalo nuevo en la flor de mi vida."
  },
  {
    text: "Mi corazón florece cuando te pienso."
  },
  {
    text: "Eres el sol que hace que mis flores crezcan."
  },
  {
    text: "La belleza no es solo lo que se ve, sino lo que se siente en el alma."
  },
  {
    text: "Tú eres el verso más hermoso que he podido escribir en mi vida."
  },
  {
    text: "Cada pétalo de esta flor representa un momento contigo."
  },
  {
    text: "En el silencio de la noche, pienso en los colores de tu sonrisa."
  },
  {
    text: "Si los susurros pudieran florecer, crearían flores como tú."
  },
  {
    text: "Eres la primavera de mis inviernos."
  },
  {
    text: "Tu nombre es una canción que florece en mi corazón."
  },
  {
    text: "Cada flor que florece en la tierra lo hace porque existes."
  },
  {
    text: "La mejor parte de mi día es cuando pienso en ti."
  },
  {
    text: "Eres hermosa en cada amanecer, en cada atardecer, siempre."
  },
  {
    text: "Mi amor por ti es tan profundo como las raíces de los árboles."
  },
  {
    text: "En tus ojos veo un universo de posibilidades infinitas."
  },
  {
    text: "La vida es una danza y tú eres mi música favorita."
  },
  {
    text: "Eres el motivo por el cual creo en los milagros."
  },
  {
    text: "Cada vez que te veo, mi corazón olvida cómo latir."
  },
  {
    text: "Eres la respuesta a todas las preguntas que alguna vez tuve."
  },
  {
    text: "Mi corazón llevaba un jardín vacío hasta que te conocí."
  },
  {
    text: "En un mundo de flores, tú eres mi flor favorita."
  },
  {
    text: "Eres la poesía que nunca podría escribir correctamente."
  },
  {
    text: "La vida cobra sentido el día que te conocí."
  },
  {
    text: "Eres el sueño que decidí no despertar."
  },
  {
    text: "Cada momento a tu lado es un capítulo hermoso de mi vida."
  }
];

export function getQuoteForDay(dayNumber: number) {
  return quotes[dayNumber % quotes.length];
}
