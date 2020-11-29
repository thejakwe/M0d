module.exports = (msg, args) => {
  msg.channel.send(eval(args.join(' ')));
}