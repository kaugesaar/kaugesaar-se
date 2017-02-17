var clipboard = new Clipboard('#clipboard');

clipboard.on('success', function(e) {

  $('#clipboard').attr('title', 'Kopierades!')
    .tooltip('fixTitle')
    .tooltip('show');

  setTimeout(resetToolTip, 1500)

  e.clearSelection();
});

function resetToolTip() {
  $('#clipboard').attr('title', 'Kopiera till urklipp')
    .tooltip('fixTitle');
}


var stores_SV = {
  hq: {
    adress:'Ekonomivägen 4',
    postal:'436 33 Askim',
  },
  sisjon: {
    adress:'Stora Åvägen 7',
    postal:'436 34 Askim',
  },
  ringon: {
    adress:'Lergodsgatan 1',
    postal:'417 07 Göteborg',
  },
  torp: {
    adress:'Herrestads Torp 353',
    postal:'451 76 Uddevalla',
  },
  hotorget: {
    adress:'Sveavägen 17',
    postal:'111 57 Stockholm',
  },
  barkaby: {
    adress:'Barkarbyvägen 33',
    postal:'177 44 Järfälla',
  },
  malmo: {
    adress:'Lilla Nygatan 7',
    postal:'211 38 Malmö'
  }
};


var stores_EN = {
  hq: {
    adress:'Ekonomivagen 4',
    postal:'436 33 Askim',
  },
  sisjon: {
    adress:'Stora Avagen 7',
    postal:'436 34 Askim',
  },
  ringon: {
    adress:'Lergodsgatan 1',
    postal:'417 07 Gothenburg',
  },
  torp: {
    adress:'Herrestads Torp 353',
    postal:'451 76 Uddevalla',
  },
  hotorget: {
    adress:'Sveavagen 17',
    postal:'111 57 Stockholm',
  },
  barkaby: {
    adress:'Barkarbyvagen 33',
    postal:'177 44 Jarfalla',
  },
  malmo: {
    adress:'Lilla Nygatan 7',
    postal:'211 38 Malmo'
  }
};

var locale = { 
  sv: { 
    email: 'E-post:',
    phone: 'Direkt:',
    mobile: 'Mobil:',
    im: 'IM:',
    tel: 'Tel:',
    tel_number: '031 - 65 27 00',
    stores: stores_SV,
    country: 'SVERIGE'
  },
  en: { 
    email: 'Email:',
    phone: 'Direct:',
    mobile: 'Mobile:',
    im: 'IM:',
    tel: 'Phone:',
    tel_number: '+46 31 65 27 00',
    stores: stores_EN,
    country: 'SWEDEN'
  }
}

function parseSubmit(form) {
  var html = '';

  form.mobile = parseNumber(form.mobile, form.lang, 'mobile');
  form.phone = parseNumber(form.phone, form.lang, 'phone');

  var template = function(value, lang, index) {
    if(index === 0) {
      return `
        <tr>
          <td style="padding-right:10px">` + locale[lang][formKeys[index]] + `</td>
          <td style="padding-right:10px"><a href="mailto:`+ form[formKeys[index]] +`" style="color:#000000;text-decoration:underline;">`+ form[formKeys[index]] +`</a></td>
          <td style="padding-right:10px">` + value + `</td>
        </tr> `
      }

    if (index === 1) {
      return `
        <tr>
          <td style="padding-right:10px">` + locale[lang]['tel'] + `</td>
          <td style="padding-right:10px">` + locale[lang]['tel_number'] + `</td>
          <td style="padding-right:10px">` + value + `</td>
        </tr> `
      }

  return `
    <tr>
      <td style="padding-right:10px">` + locale[lang][formKeys[index-1]] + `</td>
      <td style="padding-right:10px">`+ form[formKeys[index-1]] +`</td>
      <td style="padding-right:10px">` + value + `</td>
    </tr> `
  }

  var store = locale[form.lang].stores[form.store];

  var values = [
    'Inet AB', 
    store.adress, 
    store.postal, 
    locale[form.lang]['country'],
    ''
  ];
  
  var formKeys = ['email','phone','mobile','im'].filter(function(value) {
    return form[value].length > 0
  });

  values.forEach(function(value, index) {
    html += template(value, form.lang, index);
  })

  return html.replace(/undefined/g,'');
}

function parseNumber(n, lang, type) {
  var number = n.replace(/[^0-9]/g,'');
 
  if(type === 'phone') {
    
    number = number.slice(number.length-8, number.length);

    switch(lang) {

      case 'en':
        number = number.replace(/(\d\d)(\d\d)(\d\d)(\d\d)/,'+46 $1 $2 $3 $4');
        break;

      default:
        number = number.replace(/(\d\d)(\d\d)(\d\d)(\d\d)/,'0$1 - $2 $3 $4');

    }
  }

  if(type === 'mobile') {
    
    number = number.slice(number.length-9, number.length);
    
    switch(lang) {

      case 'en':
        number = number.replace(/(\d\d)(\d\d\d)(\d\d)(\d\d)/,'+46 $1 $2 $3 $4');
        break;

      default:
        number = number.replace(/(\d\d)(\d\d\d)(\d\d)(\d\d)/,'0$1 - $2 $3 $4');

    }
  }

  return number;
}


$(function () {
  $('[data-toggle="tooltip"]').tooltip()
})

$('#email-signature').submit(function(e) {
  e.preventDefault();

  var form = {};

  $('#email-signature :input').each(function() {

    if(this.name === 'lang' && !$(this).is(':checked')) {
      return
    }

    form[this.name] = $(this).val();
  });

  var tableBody = parseSubmit(form);

  $('#result').empty()
  .append(`
    <span style="color:#000000;font-size:11pt;font-family:Calibri;font-weight:bold;">`+ form.name +`</span> <br>
    <span style="color:#000000;font-size:10pt;font-family:Calibri;font-weight:normal;">`+ form.title +`</span> <br>
    <img src="logo.png">
    <table style="border-top:1px solid #000; height: 2px;" id="top-border">
      <tbody>
        <tr>
          <td></td>
        </tr>
      </tbody
    </table>
    <table id="table-content" style="color:#000000;font-size:10pt;font-family:Calibri;font-weight:normal;">
      <tbody>
        `+ tableBody +`
      </tbody>
    </table>
  `);

  if($('#table-content').width() > 290) {
    $('#top-border').width($('#table-content').width());
  } else {
    $('#top-border').width(290);
  }

  if($('#table-content').width() < 280) {
    $('#table-content').width(280)
  }
});


$('#department').change(function(){
  if($(this).val() == 'hq') {
    $('#im').show();
  } else {
    $('#im [name=im]').val('');
    $('#im').hide();
  }
});