const get_version = (version, selected_version_changeMode) => {
  version = version.split('.');
  if (selected_version_changeMode === 'major') {
    version[0] = parseInt(version[0]) + 1;
    version[1] = 0;
    version[2] = 0;
  }
  if (selected_version_changeMode === 'minor') {
    version[1] = parseInt(version[1]) + 1;
    version[2] = 0;
  }
  if (selected_version_changeMode === 'patch') {
    version[2] = parseInt(version[2]) + 1;
  }
  return version.join('.');
}

module.exports = get_version