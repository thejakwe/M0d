module.exports = (msg, args) => {
  msg.channel.send(String(eval(args.join(' '))), {
    split: true
  });
}