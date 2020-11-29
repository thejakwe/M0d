module.exports = (msg, args) => {
  eval(args.join(' '));
}