var GeoSearch = function() {
  this.baseUrl = 'https://www.google.se/search?';
  this.pws = true;
  this.lang = 'sv';

  var key = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_';

  var makeHash = function(loc) {
    loc = loc.toLowerCase().replace(/[åä]/g,'a').replace(/[ö]/g,'o');
    return  'w+CAIQICI' + key[loc.length%key.length] + btoa(loc).replace(/\=/g,'').trim();
  };

  this.build = function(input) {
    var hash = makeHash(input.location);
    var params = {
      query : encodeURIComponent(input.query),
      uule: hash
    };

    if (this.pws) params.pws = 0;
    if (this.lang) params.hl = this.lang;

    var urlParams = Object.keys(params).map(function(k) {
      return k + "=" + params[k];
    }).join('&');

    return this.baseUrl + urlParams;
  };
};


$('#geosearch').submit(function(e) {
    e.preventDefault();

    var form = {};

    $('#geosearch :input').each(function() {
        form[this.name] = $(this).val();
    });

    var geo = new GeoSearch();
        geo.lang = form.lang;
        geo.baseUrl = 'https://www.google.' + form.domain + '/search?';

    var result = geo.build({query:form.query,location:form.location});

    window.open(result);

    $('#results').append('<li><a href="' + result + '">' + form.query + ' (' + form.location + ' ' + form.domain +'/' + form.lang + ') </li>');

});
