const rp = require('request-promise');
const $ = require('cheerio');
const fs = require('fs');
const url = 'https://wordery.com/winnie-the-pooh-a-a-milne-9781405280839';

let urlsByCategories = {
  1: [ // "Children's Books"
    'https://wordery.com/harry-potter-and-the-philosophers-stone-j-k-rowling-9781408855652',
    'https://wordery.com/the-beast-of-buckingham-palace-david-walliams-9780008262174',
    
    'https://wordery.com/room-on-the-broom-julia-donaldson-9781509804771',
    'https://wordery.com/the-snail-and-the-whale-festive-edition-julia-donaldson-9781529017212',
    'https://wordery.com/monkey-puzzle-julia-donaldson-9781509830411',
    'https://wordery.com/the-gruffalo-julia-donaldson-9781509804757',
    'https://wordery.com/zog-and-the-flying-doctors-early-reader-julia-donaldson-9781407189543',

    'https://wordery.com/the-very-hungry-caterpillar-eric-carle-9780241003008',
    'https://wordery.com/look-inside-our-world-emily-bone-9781409563945',
    'https://wordery.com/winnie-the-pooh-a-a-milne-9781405280839',
    'https://wordery.com/the-peculiars-kieran-larwood-9781911490210',
    'https://wordery.com/varjak-paw-s-f-said-9780552572293',
    'https://wordery.com/secrets-of-a-sun-king-emma-carroll-9780571328499',
    'https://wordery.com/dna-school-edition-dennis-kelly-9781840029529',
    'https://wordery.com/secrets-of-a-sun-king-emma-carroll-9780571328499',
    'https://wordery.com/how-to-train-your-dragon-cressida-cowell-9780340999073'
  ],
  2: [ // "Education"
    'https://wordery.com/ks3-history-twentieth-century-world-robert-selth-9780008356033',
    'https://wordery.com/ks3-history-revision-guide-collins-ks3-9780007562886',
    'https://wordery.com/you-can-be-an-entomologist-national-geographic-kids-9781426333545',
    'https://wordery.com/the-roman-world-peter-mantin-9780521406086',
    'https://wordery.com/revolution-and-reaction-andrew-matthews-9780521567343',
    'https://wordery.com/medieval-realms-art-and-architecture-stewart-ross-9780750284677',
    'https://wordery.com/latin-to-gcse-part-2-henry-cullen-9781780934419',
    'https://wordery.com/everyday-words-in-polish-flashcards-usborne-9781409505822',
    'https://wordery.com/latin-stories-henry-cullen-9781350003842',
    'https://wordery.com/revise-edexcel-gcse-9-1-french-revision-guide-stuart-glover-9781292132082',
    'https://wordery.com/viva-aqa-gcse-spanish-grammar-and-translation-workbook-tracy-traynor-9781292133195',
    'https://wordery.com/all-about-biology-robert-winston-9780241243695'
  ],
  3: [ // "Romance"
    'https://wordery.com/hearts-of-three-jack-london-9781795416467',

    'https://wordery.com/pride-and-prejudice-jane-austen-9781847493699',
    'https://wordery.com/emma-jane-austen-9781904633006',
    'https://wordery.com/the-confessions-of-frannie-langton-sara-collins-9780241984017',
    'https://wordery.com/the-essex-serpent-sarah-perry-9781781255452',
    'https://wordery.com/the-great-alone-kristin-hannah-9781447286035',
    'https://wordery.com/the-rosie-result-graeme-simsion-9781405941303',
    'https://wordery.com/the-confession-jessie-burton-9781509886142',
    'https://wordery.com/things-can-only-get-better-david-m-barnett-9781409185161',
    'https://wordery.com/prince-of-cats-ron-wimberly-9781534312074',
    'https://wordery.com/once-twice-three-times-an-aisling-emer-mclysaght-9780241361771',
    'https://wordery.com/big-little-lies-liane-moriarty-9781405916363',
    'https://wordery.com/a-perfect-cornish-christmas-phillipa-ashley-9780008316150',
    'https://wordery.com/the-letter-kathryn-hughes-9781472229953',
    'https://wordery.com/crudo-olivia-laing-9781509892846',
    'https://wordery.com/the-pursuit-of-love-nancy-mitford-9780241974681',
    'https://wordery.com/the-rosie-effect-graeme-simsion-9781405918060',
    'https://wordery.com/we-met-in-december-rosie-curtis-9780008353551'
  ],
  4: [ // "Science Fiction & Fantasy"
    'https://wordery.com/the-last-wish-andrzej-sapkowski-9780575082441',
    'https://wordery.com/sword-of-destiny-andrzej-sapkowski-9781473211544',
    'https://wordery.com/season-of-storms-andrzej-sapkowski-9781473218086',
    'https://wordery.com/blood-of-elves-andrzej-sapkowski-9780575084841',
    
    'https://wordery.com/a-game-of-thrones-reissue-george-r-r-martin-9780007448036',
    'https://wordery.com/a-clash-of-kings-reissue-george-r-r-martin-9780007447831',

    'https://wordery.com/the-fellowship-of-the-ring-j-r-r-tolkien-9780007203543',
    'https://wordery.com/the-hobbit-j-r-r-tolkien-9780261102668',
    'https://wordery.com/the-two-towers-j-r-r-tolkien-9780261103580',
    'https://wordery.com/the-return-of-the-king-j-r-r-tolkien-9780007203567',
    'https://wordery.com/frankissstein-jeanette-winterson-9781784709952',
    'https://wordery.com/lao-tzu-tao-te-ching-ursula-k-le-guin-9781611807240',
    'https://wordery.com/the-farthest-shore-ursula-k-le-guin-9781473223585',
    'https://wordery.com/circe-madeline-miller-9781408890042',
    'https://wordery.com/the-silmarillion-j-r-r-tolkien-9780261102422',
    'https://wordery.com/the-stiehl-assassin-book-three-of-the-fall-of-shannara-terry-brooks-9780356510231',
    'https://wordery.com/dead-astronauts-jeff-vandermeer-9780008375324',
    'https://wordery.com/the-dispossessed-ursula-k-le-guin-9781857988826',
    'https://wordery.com/good-omens-neil-gaiman-9781473200852',
    'https://wordery.com/mort-terry-pratchett-9781473200104',
    'https://wordery.com/the-rise-of-magicks-nora-roberts-9780349415017',
    'https://wordery.com/finale-stephanie-garber-9781473666764',
    'https://wordery.com/godsgrave-jay-kristoff-9780008180065',
    'https://wordery.com/in-the-time-we-lost-carrie-hope-fletcher-9780751571264',
    'https://wordery.com/uprooted-naomi-novik-9781447294146',
    'https://wordery.com/shadow-of-the-fox-julie-kagawa-9781848457393',
    'https://wordery.com/to-kill-a-kingdom-alexandra-christo-9781471407390'
  ],
  5: [ // "Mystery, Thriller & Suspense"
    'https://wordery.com/the-sign-of-four-sir-arthur-conan-doyle-9780141395487',
    'https://wordery.com/the-hound-of-the-baskervilles-sir-arthur-conan-doyle-9780140437867',
    'https://wordery.com/a-study-in-scarlet-sir-arthur-conan-doyle-9780141395524',

    'https://wordery.com/1984-george-orwell-9780141036144',

    'https://wordery.com/the-outsider-stephen-king-9781473676398',
    'https://wordery.com/the-shining-stephen-king-9781444720723',


    'https://wordery.com/dracula-bbc-tie-in-edition-bram-stoker-9781785945168',
    'https://wordery.com/frankissstein-jeanette-winterson-9781784709952',

    'https://wordery.com/once-upon-a-river-diane-setterfield-9781784163631',
    'https://wordery.com/the-murder-of-roger-ackroyd-agatha-christie-9780007527526',
    'https://wordery.com/mr-nobody-catherine-steadman-9781471167225',
    'https://wordery.com/tidings-of-death-at-honeychurch-hall-hannah-dennison-9781472128508',
    'https://wordery.com/someone-we-know-shari-lapena-9781787632134',
    'https://wordery.com/closed-for-winter-jorn-lier-horst-9781908737496',
    'https://wordery.com/shantaram-gregory-david-roberts-9780349117546',
    'https://wordery.com/the-name-of-the-rose-umberto-eco-9780099466031',
    'https://wordery.com/moon-over-soho-ben-aaronovitch-9780575097629',
    'https://wordery.com/nothing-important-happened-today-will-carver-9781912374830'
  ]
}

let book = {
  author: (html) => {
    let authors = [];
    $('#product-description-and-details dt', html).each((i, el) => {
      if ($(el).text().includes('Author')){
        authors.push($(el).next().find('a span').text())
      }
    });
    return authors.join(', ');
  },
  description: (html) => {
    return $('#product-description .c-panel__body p', html)
      .map((i, el) => $(el).text()).get().join('\n')
  },
  images: (html) => {
    return 'https://wordery.com' + $('img.c-prod-img__img.js-main-prod-img', html)
      .map((i, el) => $(el).data('cfsrc')).get()
  },
  isbn: (html) => $('#product-description-and-details dd[itemprop=isbn]', html).text(),
  publishers: (html) => {
    return $('#product-description-and-details a[itemprop=publisher]', html)
      .map((i, el) => $(el).text()).get();
  },
  publication_date: (html) => $('#product-description-and-details dd[itemprop=datePublished]', html).attr('datetime'),
  pages: (html) => $('#product-description-and-details [itemprop="numberOfPages"]', html).text(),
  series: (html) => {
    let series = [];
    $('#product-description-and-details dt', html).each((i, el) => {
      if ($(el).text().includes('Series')){
        series.push($(el).next().find('a').text())
      }
    });
    return series.join(', ');
  },
  title: (html) => $('h1[itemprop=name] > strong', html).text(),
  translated_by: (html) => {
    let translators = [];
    $('#product-description-and-details dt', html).each((i, el) => {
      if ($(el).text().includes('Translated by')){
        translators.push($(el).next().find('a span').text())
      }
    });
    return translators.join(', ');
  }
}

function timeout(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

let writeToFile = (json) => {
  let data = JSON.stringify(json, null, 2);
  fs.writeFileSync('server/books.json', data);
}

function gettingHTML(url) {
  console.log('getting HTML for ', url);

  return rp(url).then(function (html) {
    let bookJSON = {};
    for (let field in book){
      bookJSON[field] = book[field](html);
    }
    return bookJSON;
  })
}

function scrap(){

  let books = [];

  //making books array plain
  for (let category_id in urlsByCategories){
    urlsByCategories[category_id].forEach((url, idx) => {
      books.push({
        category_id,
        url,
        id: parseInt(category_id.toString() + idx.toString(), 10)
      })
    })
  }

  (async function(){
    for (let book of books){
      let ms = getRandomArbitrary(1000, 5000);
      let [res] = await Promise.all([gettingHTML(book.url), timeout(ms)]);
      Object.assign(book, res);
      delete book.url;
    }
    writeToFile(books);
  })();
}

scrap();