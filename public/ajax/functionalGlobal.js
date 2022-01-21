function requestData(url, opt, callback) {
  $.ajax({
    type: opt.method,
    url: url,
    data: opt.params,
    success: function (msg) {
      callback(msg);
    },
  });
}
