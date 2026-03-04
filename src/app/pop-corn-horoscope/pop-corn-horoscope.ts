import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface PopcornOption {
  flavor: string;
  emoji: string;
  message: string;
}

@Component({
  selector: 'app-pop-corn-horoscope',
  imports: [FormsModule,CommonModule],
  templateUrl: './pop-corn-horoscope.html',
  styleUrl: './pop-corn-horoscope.scss',
})
export class PopCornHoroscope {
  birthDate?: string;
  result?: PopcornOption;

  popcornOptions: PopcornOption[] = [

  { flavor: "Pop-corn charisme surdimensionné", emoji: "😎🍿",
    message: "Aujourd’hui tu es incroyable. Vraiment. Un peu trop incroyable. Ça en devient suspect." },

  { flavor: "Pop-corn chaussette glamour", emoji: "🧦✨",
    message: "Tu brilles… mais d’une manière légèrement dérangeante." },

  { flavor: "Pop-corn génie incompris", emoji: "🧠🔥",
    message: "Tu as raison. Tout le monde a tort. Comme d’habitude." },

  { flavor: "Pop-corn diva intergalactique", emoji: "💅🚀",
    message: "Tu es la star aujourd’hui. Même si personne n’a demandé de concert." },

  { flavor: "Pop-corn brocoli supérieur", emoji: "🥦👑",
    message: "Tu es sain, équilibré… et légèrement ennuyeux. Mais avec classe." },

  { flavor: "Pop-corn drama queen deluxe", emoji: "🎭💎",
    message: "Un petit événement va devenir une saga Netflix dans ta tête." },

  { flavor: "Pop-corn sexy sans raison", emoji: "🔥🍿",
    message: "Aujourd’hui tu es canon. Même en jogging. Surtout en jogging." },

  { flavor: "Pop-corn cerveau en maintenance", emoji: "🔧🧠",
    message: "Tu vas parler avant de réfléchir. Mais avec assurance." },

  { flavor: "Pop-corn licorne prétentieuse", emoji: "🦄😌",
    message: "Tu es magique. Et tu le sais. Et ça se voit. Beaucoup." },

  { flavor: "Pop-corn karma premium", emoji: "✨💳",
    message: "La chance est avec toi… probablement parce que tu l’as commandée en express." },

  { flavor: "Pop-corn énergie caféine pure", emoji: "☕⚡",
    message: "Tu vas parler vite. Trop vite. Personne ne suivra." },

  { flavor: "Pop-corn jalousie involontaire", emoji: "😏🍿",
    message: "Quelqu’un va te trouver incroyable aujourd’hui. Ça va t’amuser." },

  { flavor: "Pop-corn modestie en option", emoji: "👑😇",
    message: "Tu es humble. Enfin… quand ça t’arrange." },

  { flavor: "Pop-corn catastrophe mignonne", emoji: "💥😊",
    message: "Tu vas faire une bourde. Mais étrangement, ça va te rendre adorable." },

  { flavor: "Pop-corn mystère intense", emoji: "🕶️🌫️",
    message: "Tu es profond aujourd’hui. Même toi tu ne te comprends pas." },

  { flavor: "Pop-corn ego en HD", emoji: "📺😎",
    message: "Ton estime de toi est en 4K. Attention à ne pas aveugler les autres." },

  { flavor: "Pop-corn chance insolente", emoji: "🍀😏",
    message: "Tu vas réussir sans trop d’effort. Et ça va énerver quelqu’un." },

  { flavor: "Pop-corn romantique dramatique", emoji: "💘🎬",
    message: "Tu vas vivre une scène de film. Peut-être un peu trop intense pour un mercredi." },

  { flavor: "Pop-corn cerveau brillant mais flou", emoji: "✨🤯",
    message: "Tu es intelligent. Mais pas aujourd’hui. Aujourd’hui c’est freestyle." },

  { flavor: "Pop-corn aura magnétique", emoji: "🧲💫",
    message: "On va te regarder. Pas toujours pour les bonnes raisons." },

  { flavor: "Pop-corn boss attitude", emoji: "💼🔥",
    message: "Tu prends des décisions aujourd’hui. Certaines bonnes. Certaines… audacieuses." },

  { flavor: "Pop-corn chance suspecte", emoji: "🎲😳",
    message: "Tout va trop bien. Méfie-toi. Ou profite. Ton choix." },

  { flavor: "Pop-corn beauté inattendue", emoji: "💋🍿",
    message: "Quelqu’un va te trouver irrésistible. Tu ne sauras même pas pourquoi." },

  { flavor: "Pop-corn cerveau sarcastique", emoji: "😏🧠",
    message: "Tu vas sortir LA phrase parfaite. Et le regretter 3 secondes après." },

  { flavor: "Pop-corn énergie chaos maîtrisé", emoji: "🌪️😌",
    message: "Ça va partir dans tous les sens. Mais étrangement, tu gères." }

];

  generateHoroscope(): void {
    if (!this.birthDate) return;

    const date = new Date(this.birthDate);
    const day = date.getDate();
    const month = date.getMonth() + 1;

    const index = (day * 31 + month) % this.popcornOptions.length;
    this.result = this.popcornOptions[index];
  }
}
