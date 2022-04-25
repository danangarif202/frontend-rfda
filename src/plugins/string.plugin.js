const stringPlugin = {
  makeRandomStr(length) {
    var result = [];
    var characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result.push(
        characters.charAt(Math.floor(Math.random() * charactersLength))
      );
    }
    return result.join("");
  },

  getCodeName(nameStr = "Ferry Anggriawan") {
    const nameArr = nameStr.split(" ");
    let firstCode = nameArr[0].charAt(0);
    let lastCode;

    if (nameArr.length == 1) {
      lastCode = nameArr[0].charAt(1);
    } else if (nameArr.length > 1) {
      lastCode = nameArr[1].charAt(0);
    }

    return `${firstCode}${lastCode}`;
  },
};

export default stringPlugin;
