var os = require('os');

module.exports = function () {
  var ifaces = os.networkInterfaces();
  var ipList = [];

  Object.keys(ifaces).forEach(ifname => {
    var alias = 0;

    ifaces[ifname].forEach(iface => {
      // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
      if (iface.family !== 'IPv4' || iface.internal !== false) {
        return;
      }

      if (alias >= 1) {
        // this single interface has multiple ipv4 addresses
        ipList.push({ name: `${ifname}:${alias}`, address: iface.address });
      } else {
        // this interface has only one ipv4 adress
        ipList.push({ name: ifname, address: iface.address });
      }
      alias++;
    });
  });

  return ipList;
}
