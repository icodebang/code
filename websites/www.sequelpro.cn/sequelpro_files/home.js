

var latestVersionXhr = new XMLHttpRequest()
latestVersionXhr.open('GET', 'release?do=latest-version-info', true)

latestVersionXhr.onreadystatechange = function() {
  if (latestVersionXhr.readyState != XMLHttpRequest.DONE) {
    return
  }
  
  var release = JSON.parse(latestVersionXhr.responseText)
  
  document.getElementById('download-version-number').innerHTML = release.version
  document.getElementById('download-version-requirements').innerHTML = release.requirements
  
  document.getElementById('download-version-info').style.opacity = ''
  
}

latestVersionXhr.send(null)
