import React from "react";
import styles from "../../styles/faq.module.css";
import Question from "./Question/Question";
function FAQ() {
  const questionsAnswers = [
    {
      question: "QUAND ET OÙ AURA LIEU LA VENTE ?",
      answer:
        "Vous pourrez accéder à la vente directement depuis ce site, le 17 décembre à 10h (heure de Paris). Nous vous invitons à vous rendre sur notre site quelques minutes avant et à cliquer sur “acheter” dès que l’option sera disponible publiquement. Pour vous assurer d’avoir accès à la vente, nous vous recommandons de vous inscrire à notre liste de diffusion, en ajoutant votre email, pour ne manquer aucune information et recevoir un mail quelques minutes avant l’ouverture de la boutique. Attention, dès que le paiement de votre carte membre est confirmé, pensez bien à ajouter votre adresse email afin que nous puissions vous recontacter et vous envoyer les instructions pour profiter de tous vos avantages.",
    },
    {
      question: "COMBIEN COÛTE LA CARTE MEMBRE ET COMMENT PAYER ?",
      answer:
        "La carte membre est vendue au prix de 315$ USDC, soit environ 290€. Le prix pourra légèrement varier, compte tenu du caractère volatile des devises financières et des devises numériques. Le paiement se fera en utilisant la crypto-monnaie USDC, mais pas de panique, vous pourrez payer par carte bancaire, en utilisant le module de paiement “crossmint”. Crossmint convertira automatiquement vos euros en USDC, puis vous transférera le NFT (la carte membre) sur votre portefeuille numérique (votre wallet) attaché à votre adresse email. Si vous possédez un portefeuille numérique de type metamask avec des USDC, vous pourrez procéder à l’achat directement en utilisant votre portefeuille numérique. Attention, dès que le paiement de votre carte membre est confirmé, pensez bien à ajouter votre adresse email afin que nous puissions vous recontacter et vous envoyer les instructions pour profiter de tous vos avantages.",
    },
    {
      question: "COMMENT UTILISER MA CARTE NUMÉRIQUE ?",
      answer:
        "Votre carte numérique est un NFT (non-fungible-token) et est hébergée sur la blockchain Polygon, une blockchain peu énergivore et verte. Cette carte est votre ticket d’entrée. Elle vous permettra de vous authentifier en ligne, d’accéder aux évènements et servira également de souvenir.",
    },
    {
      question: "LE DÎNER EST-IL RÉSERVÉ EXCLUSIVEMENT AUX MEMBRES ?",
      answer:
        "Les dîners sont une expérience exclusive, réservée aux membres. Nous souhaitons mettre en avant nos valeurs de partage en permettant à des curieux et passionnés, partageant les mêmes centres d’intérêts, de se rencontrer. La priorité est donc aux membres, toutefois, si vous souhaitez partager l’expérience avec un proche non membre, c’est-à-dire inviter un +1, cela sera possible, sous réserve de disponibilité, au tarif de 240€ TTC par dîner et par invité.",
    },
    {
      question: "LE MENU EST-IL FIXE POUR TOUS LES DÎNERS ?",
      answer:
        "Oui, le menu a été conçu spécialement par nos chefs pour s’accorder aux champagnes de la maison, offrant ainsi une expérience culinaire soigneusement élaborée. Seules les allergies doivent être signalées. Une fois le menu publié, veuillez informer l’organisateur de toute allergie alimentaire.",
    },
    {
      question: "COMMENT RÉSERVER UN DÎNER ?",
      answer:
        "Chaque membre aura la possibilité de choisir parmi les 4 dates attribuées à chaque chef, réparties tout au long de l’année. Les réservations sont ouvertes selon le principe du “premier arrivé, premier servi”, mais si la demande est élevée, nous pourrions envisager d’ajouter des dates supplémentaires.",
    },
    {
      question:
        "QU'EST-CE QUE LE DÉGORGEMENT SUR-MESURE DANS LE CADRE DU CLUB MEMBRE PHILIPPE GONET ?",
      answer:
        "Le dégorgement sur-mesure est une option exclusive offerte aux membres du Club Membre Philippe Gonet. Il permet à chaque membre de conserver ses bouteilles dans la cave de la maison Philippe Gonet. Lorsque le client décide de dégorger sa bouteille, il a la liberté de le faire selon ses propres préférences et au moment qui lui convient le mieux.",
    },
    {
      question: "COMBIEN Y-A T’IL DE PLACES DISPONIBLES ?",
      answer:
        "Le nombre de places est initialement limité à 200, mais en fonction de la demande, nous pourrions envisager d’ajuster le nombre maximal à 250 membres, soit 250 NFT. Cela dépendra de la demande globale pour les dîners.",
    },
    {
      question: "Y A-T-IL UNE DATE LIMITE POUR UTILISER MA CARTE ?",
      answer:
        "Les membres bénéficiant d’une adhésion d’un an (1er janvier 2024 au 31 décembre 2024) ont accès aux offres, cependant, dès l’expiration de leur abonnement, l’accès aux offres et prestations prend fin. Cela englobe tous les avantages tels que le stockage de leurs bouteilles dans la cave, l’accès aux réductions, ou encore celui aux cuvées exclusives.",
    },
    {
      question:
        "QUELS SONT LES AVANTAGES DE RENOUVELER SON ADHÉSION POUR UNE DEUXIÈME ANNÉE ?",
      answer:
        "En renouvelant leur adhésion, les membres conservent les avantages du club, y compris le stockage privilégié. La N2 offrira de nouvelles fonctionnalités et une expérience améliorée pour les membres existants. En tant que membre fondateur, vous bénéficierez d’une réduction pour la seconde édition.",
    },
    {
      question: "PUIS-JE OFFRIR CETTE EXPÉRIENCE?",
      answer:
        "Oui évidemment ! La Carte Membre Numérique peut être un cadeau parfait pour un proche passionné de champagne et de gastronomie. Il vous suffira de transférer votre carte membre NFT à votre proche puis de nous envoyer par email, l’adresse email de votre proche, nous pourrons ainsi avoir son contact et l’ajouter à la liste des canaux de diffusion et lui donner son rôle dans le serveur discord afin de bénéficier de tous ses avantages.",
    },
    {
      question: "QU'ADVIENT-IL SI JE NE PEUX PAS ASSISTER À UN DÎNER?",
      answer:
        "Nous chercherons à accommoder vos besoins, mais l’exclusivité et la nature personnalisée des événements signifient que les places sont limitées. Les 4 dates prévues devraient tout de même vous permettre de participer à un des 4 repas de nos chefs.",
    },
    {
      question: "COMMENT FONCTIONNENT LES RÉDUCTIONS SUR LA BOUTIQUE EN LIGNE?",
      answer:
        "Nous ajouterons votre adresse email en tant que bénéficiaire des réductions sur la boutique en ligne “shop.champagne-philippe-gonet.com”. Vous aurez également la possibilité d’acheter des bouteilles en bénéficiant de la réduction lors des évènements organisés pour les membres du club. La réduction n’est pas valable chez nos revendeurs.",
    },
    {
      question: "QU'EST-CE QU'UN NFT ?",
      answer:
        "Un NFT (Non Fungible Token) représente un actif numérique unique et indivisible, souvent utilisé pour certifier la propriété et l’authenticité d’éléments virtuels tels que des œuvres d’art, des vidéos, des clips audio, des objets de jeu et plus encore. Les NFTs ne sont pas interchangeables, ce qui les rend précieux pour la représentation de biens uniques sur la blockchain.",
    },
    {
      question: "QU'EST-CE QUE LA BLOCKCHAIN ?",
      answer:
        "La blockchain est une technologie de registre distribué qui enregistre de manière sécurisée et transparente des transactions ou des données sur un réseau décentralisé. Elle se compose de blocs de données connectés de manière chronologique, chaque bloc étant lié au précédent grâce à des mécanismes cryptographiques. Cette technologie garantit l’intégrité, la traçabilité et la sécurité des informations stockées, en permettant à plusieurs parties de collaborer sans nécessiter une autorité centrale.",
    },
    {
      question: "QU'EST-CE QUE LE WEB 3 ?",
      answer:
        "Le Web 3, égale ment appelé le “Web décentralisé”, est une évolution de l’Internet qui met l’accent sur la souveraineté des utilisateurs sur leurs données et leurs actifs numériques. Il exploite les capacités de la blockchain et des contrats intelligents pour permettre aux utilisateurs de posséder, de contrôler et de monétiser directement leurs données et créations en ligne, notamment à travers les NFTs. Cette transformation vise à réduire la dépendance vis-à-vis des grandes plateformes et à donner plus de pouvoir aux individus.",
    },
    {
      question: "QU'EST-CE QU'UN WALLET ?",
      answer:
        "Un Wallet, ou portefeuille, est une application ou un logiciel qui permet de stocker, gérer et interagir avec des actifs numériques tels que des cryptomonnaies et des NFTs. Il contient des clés privées et publiques qui permettent à un utilisateur d’accéder et de sécuriser ses actifs sur la blockchain. Les Wallets peuvent être en ligne, hors ligne (matériels) ou sous forme d’applications mobiles, et ils jouent un rôle crucial dans la gestion sécurisée des actifs numériques d’un utilisateur.",
    },
  ];
  return (
    <div className={styles.faq_container}>
      <div className={styles.faq_title}>FAQ</div>
      {questionsAnswers.map((qa, index) => (
        <Question key={index} question={qa.question} answer={qa.answer} />
      ))}
    </div>
  );
}

export default FAQ;
