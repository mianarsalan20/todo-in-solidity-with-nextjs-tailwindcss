const TodoTaskContract = artifacts.require("TodoTaskContract");

module.exports = function (deployer) {
  deployer.deploy(TodoTaskContract);
};
