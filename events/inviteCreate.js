module.exports = inv => {
  if (inv.guild.id == global.config.guild) {
    global.invites[inv.code] = {
      uses: inv.uses,
      max: inv.maxUses
    };
  }
}