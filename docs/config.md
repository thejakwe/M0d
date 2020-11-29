# Configuring with config.yaml

### Fields
|Name|Description|
|-|-|-|-|
|token|your bot token from discord
|prefix|the prefix for commands
|roles.mod|a list of role or member ids that will be able to use moderation commands
||NOTE: Members with the administrator permission and the server owner will always be able to use commands regardless of this
|roles.muted|the id of a role to be given to members when they are muted

### Logging events
The bot can log these events
|Name|Description|
|-|-|
|commands|When a command for the bot is used
|actions|When the bot performs a moderation action
|member.join|When someone joins the server
|member.leave|When someone leaves the server
|member.kick|When someone is kicked from the server
|member.ban|When someone is banned from the server
|member.unban|When someone is unbanned from the server
|member.nick|When someone's nickname changes
|roles.add|When a member receives a role
|roles.remove|When a member is removed from a role
|roles.create|When a role is created
|roles.update|When a role is updated
|roles.delete|When a role is deleted
|message.delete|When a message is deleted
|message.deleteBulk|When many messages are deleted at once
|message.edit|When a message's content is edited
|message.pin|When a message is pinned
|message.unpin|When a message is unpinned
|voice.join|When someone joins a voice channel
|voice.leave|When someone leaves a voice channel
|voice.switch|When someone changes voice channels (not a leave or join)
|voice.move|When someone is moved between voice channels (forced, not a switch)
|voice.disconnect|When someone is disconnected from a voice channel (forced, not a leave)
|channel.create|When a channel is created
|channel.update|When a channel is updated
|channel.delete|When a channel is deleted
|emoji.create|When an emoji is created
|emoji.update|When an emoji is updated
|emoji.delete|When an emoji is deleted
|webhook.create|When a webhook is created
|webhook.update|When a webhook is updated
|webhook.delete|When a webhook is deleted
|invite.create|When an invite is created
|invite.delete|When an invite is deleted
