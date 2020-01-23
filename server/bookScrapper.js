const rp = require('request-promise');
const $ = require('cheerio');
const fs = require('fs');
const url = 'https://wordery.com/winnie-the-pooh-a-a-milne-9781405280839';

let urlsByCategories = {
  'Children\'s Books': [
    'https://wordery.com/harry-potter-and-the-philosophers-stone-j-k-rowling-9781408855652',
    'https://wordery.com/the-beast-of-buckingham-palace-david-walliams-9780008262174',
    
    'https://wordery.com/room-on-the-broom-julia-donaldson-9781509804771',
    'https://wordery.com/the-snail-and-the-whale-festive-edition-julia-donaldson-9781529017212',
    'https://wordery.com/monkey-puzzle-julia-donaldson-9781509830411',
    'https://wordery.com/the-gruffalo-julia-donaldson-9781509804757',
    'https://wordery.com/zog-and-the-flying-doctors-early-reader-julia-donaldson-9781407189543',

    'https://wordery.com/the-very-hungry-caterpillar-eric-carle-9780241003008',
    'https://wordery.com/look-inside-our-world-emily-bone-9781409563945',
    'https://wordery.com/winnie-the-pooh-a-a-milne-9781405280839'
  ],
  'Education': [
    'https://wordery.com/ks3-history-twentieth-century-world-robert-selth-9780008356033',
    'https://wordery.com/ks3-history-revision-guide-collins-ks3-9780007562886',
    'https://wordery.com/you-can-be-an-entomologist-national-geographic-kids-9781426333545',
    'https://wordery.com/the-roman-world-peter-mantin-9780521406086',
    'https://wordery.com/revolution-and-reaction-andrew-matthews-9780521567343',
    'https://wordery.com/medieval-realms-art-and-architecture-stewart-ross-9780750284677'
  ],
  'Romance': [
    'https://wordery.com/hearts-of-three-jack-london-9781795416467',

    'https://wordery.com/pride-and-prejudice-jane-austen-9781847493699',
    'https://wordery.com/emma-jane-austen-9781904633006',
    'https://wordery.com/the-confessions-of-frannie-langton-sara-collins-9780241984017',
    'https://wordery.com/the-essex-serpent-sarah-perry-9781781255452',
    'https://wordery.com/the-great-alone-kristin-hannah-9781447286035'
  ],
  'Science Fiction & Fantasy': [
    'https://wordery.com/the-last-wish-andrzej-sapkowski-9780575082441',
    'https://wordery.com/sword-of-destiny-andrzej-sapkowski-9781473211544',
    'https://wordery.com/season-of-storms-andrzej-sapkowski-9781473218086',
    'https://wordery.com/blood-of-elves-andrzej-sapkowski-9780575084841',
    
    'https://wordery.com/a-game-of-thrones-reissue-george-r-r-martin-9780007448036',
    'https://wordery.com/a-clash-of-kings-reissue-george-r-r-martin-9780007447831',

    'https://wordery.com/the-fellowship-of-the-ring-j-r-r-tolkien-9780007203543',
    'https://wordery.com/the-hobbit-j-r-r-tolkien-9780261102668',
    'https://wordery.com/the-two-towers-j-r-r-tolkien-9780261103580',
    'https://wordery.com/the-return-of-the-king-j-r-r-tolkien-9780007203567'
  ],
  'Mystery, Thriller & Suspense': [
    'https://wordery.com/the-sign-of-four-sir-arthur-conan-doyle-9780141395487',
    'https://wordery.com/the-hound-of-the-baskervilles-sir-arthur-conan-doyle-9780140437867',
    'https://wordery.com/a-study-in-scarlet-sir-arthur-conan-doyle-9780141395524',

    'https://wordery.com/1984-george-orwell-9780141036144',

    'https://wordery.com/the-outsider-stephen-king-9781473676398',
    'https://wordery.com/the-shining-stephen-king-9781444720723',


    'https://wordery.com/dracula-bbc-tie-in-edition-bram-stoker-9781785945168',
    'https://wordery.com/frankissstein-jeanette-winterson-9781784709952'
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

let generateBookJSON = (html) => {
  let bookJSON = {};

  for (let field in book){
    bookJSON[field] = book[field](html);
  }
  return bookJSON;
}

let writeToFile = (json) => {
  let data = JSON.stringify(json, null, 2);
  fs.writeFileSync('server/books.json', data);
}

let totalJSON = { books: [] };

let gettingHTML = (url, id, category) => {
  console.log({
    id: id,
    category: category,
    url: url
  })
}

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

let scrap = () => {
  let id = 0, ms = 0;

  for (let category in urlsByCategories){
    let urls = urlsByCategories[category];

    urls.forEach((url) => {
      let id_now = id;
      let category_now = category;

      setTimeout(() => { gettingHTML(url, id_now, category_now) }, ms);
      id++;
      ms += getRandomArbitrary(1000, 5000);
    });
  }
}

scrap();

// setTimeout(myFunc, 1500);