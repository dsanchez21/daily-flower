export const quotes = [
  {
    text: "La vida es una flor de la cual el amor es la miel.",
    author: "Víctor Hugo"
  },
  {
    text: "Eres mi flor favorita en el jardín de mis días.",
    author: "Anónimo"
  },
  {
    text: "No hay flor tan bella como aquella que crece entre espinas.",
    author: "Anónimo"
  },
  {
    text: "Tú eres la razón por la cual el cielo es azul.",
    author: "Desconocido"
  },
  {
    text: "En tu sonrisa veo los colores de todas las flores del mundo.",
    author: "Anónimo"
  },
  {
    text: "Cada día contigo es un pétalo nuevo en la flor de mi vida.",
    author: "Anónimo"
  },
  {
    text: "Mi corazón florece cuando te pienso.",
    author: "Anónimo"
  },
  {
    text: "Eres el sol que hace que mis flores crezcan.",
    author: "Anónimo"
  },
  {
    text: "La belleza no es solo lo que se ve, sino lo que se siente en el alma.",
    author: "Anónimo"
  },
  {
    text: "Tú eres el verso más hermoso que he podido escribir en mi vida.",
    author: "Anónimo"
  },
  {
    text: "Cada pétalo de esta flor representa un momento contigo.",
    author: "Anónimo"
  },
  {
    text: "En el silencio de la noche, pienso en los colores de tu sonrisa.",
    author: "Anónimo"
  },
  {
    text: "Si los susurros pudieran florecer, crearían flores como tú.",
    author: "Anónimo"
  },
  {
    text: "Eres la primavera de mis inviernos.",
    author: "Anónimo"
  },
  {
    text: "Tu nombre es una canción que florece en mi corazón.",
    author: "Anónimo"
  },
  {
    text: "Cada flor que florece en la tierra lo hace porque existís.",
    author: "Anónimo"
  },
  {
    text: "La mejor parte de mi día es cuando pienso en ti.",
    author: "Anónimo"
  },
  {
    text: "Eres hermosa en cada amanecer, en cada atardecer, siempre.",
    author: "Anónimo"
  },
  {
    text: "Mi amor por ti es tan profundo como las raíces de los árboles.",
    author: "Anónimo"
  },
  {
    text: "En tus ojos veo un universo de posibilidades infinitas.",
    author: "Anónimo"
  },
  {
    text: "La vida es una danza y tú eres mi música favorita.",
    author: "Anónimo"
  },
  {
    text: "Eres el motivo por el cual creo en los milagros.",
    author: "Anónimo"
  },
  {
    text: "Cada vez que te veo, mi corazón olvida cómo latir.",
    author: "Anónimo"
  },
  {
    text: "Eres la respuesta a todas las preguntas que alguna vez tuve.",
    author: "Anónimo"
  },
  {
    text: "Mi corazón llevaba un jardín vacío hasta que te conocí.",
    author: "Anónimo"
  },
  {
    text: "En un mundo de flores, tú eres mi flor favorita.",
    author: "Anónimo"
  },
  {
    text: "Eres la poesía que nunca podría escribir correctamente.",
    author: "Anónimo"
  },
  {
    text: "La vida cobra sentido el día que te conocí.",
    author: "Anónimo"
  },
  {
    text: "Eres el sueño que decidí no despertar.",
    author: "Anónimo"
  },
  {
    text: "Cada momento a tu lado es un capítulo hermoso de mi vida.",
    author: "Anónimo"
  }
];

export function getQuoteForDay(dayNumber: number) {
  return quotes[dayNumber % quotes.length];
}
