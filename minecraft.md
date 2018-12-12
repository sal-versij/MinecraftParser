Types:
- *T*> general
- Elemental
  - *F*: float
  - *S*: string
  - *I*: int
  - *B*: boolean
- Compounded
  - *R*> [*I*..*I*]
  - *A*[__T__]> [*T*,...]
  - *O*> {*S*: *T*}
  - *L*[__T__]> {*T*,...}
  - *ID*> *S*:*S*: namespace:name
  - *J*> *O*: JSON
  - *NBT*> *O*: NBT Data
- Referencial
  - *Sort*|*L[__S__]*->*S*> Sort = {'nearest', 'furthest', 'random', 'arbitrary'}
  - *GM*|*L[__S__]*->*S*> GameMode = {'survival', 'creative', 'adventure', 'spectator'} 
  - *EID*|*L[__ID__]*->*ID*> Entity ID
  - *AdvID*|*L[__ID__]*->*ID*> Advancement ID
  - *AdvC*|*L[__S__]*->*S*> Advancement Criteria
  - *Diff*|*L[__S__]*->*S*> Difficulty = {'peaceful', 'easy', 'normal', 'hard'}
  - *BBS*|*L[__S__]*->*S*> Boss Bar Style = {'notched_6', 'notched_10', 'notched_12', 'notched_20', 'progress'}
  - *Command*|*S*> Command
Attributes:
- *!*~> `NOT`-able
- ~*?*> `NULL`-able
 
Elements:
- *coord*> coordinates
  - abs
    - x|*I*, *D*
    - y|*I*, *D*
    - z|*I*, *D*
  - rel< `~`
    - x|*I*, *D*
    - y|*I*, *D*
    - z|*I*, *D*
  - pol< `^`
    - x|*I*, *D*
    - y|*I*, *D*
    - z|*I*, *D*
- *@*> target
  - `@p` \
    nearest player
  - `@r` \
    random player
  - `@a` \
    all players
  - `@e` \
    all entities
  - `@s` \
    the entity executing the command
  - selector: `[...]`
    - position
      - coord
        - `x`|*D*
        - `y`|*D*
        - `z`|*D*
      - `distance`|*R*, *I*
      - volume
        - `dx`|*D*
        - `dy`|*D*
        - `dz`|*D*
    - scoreboard
      - `scores`|*O*
      - `tag`|*!S*
      - `team`|*S*
    - traits
      - `limit`|*I*
        - `sort`|*Sort*
      - `level`|*R*, *I*
      - `gamemode`|*!GM*
      - `name`|*SN*
      - rotation
        - `x_rotation`|*R*, *I*
        - `y_rotation`|*R*, *I*
      - `type`|*!EID*

## List of commands
### advancment
- grant|revoke
  - player: *S*
    - only
      - advancement: *S*
        - criterian: *AdvC?*
    - until|from|through
      - advancement: *AdvID*
    - everything
---

### bossbar
- add
  - id: *ID*
    - name: *J* 
- set
  - id: *ID*
    - name
      - name: *S*
    - color
      - color: *S*
    - style
      - style: *S*
    - value
      - value: *S*
    - max
      - max: *S*
    - visible
      - visible: *S*
    - players
      - players: *S*
- remove
  - id: *ID*
- list
- get
  - id: *ID*
    - max|players|value|visible

### clear
- clear
  - targets: *@?*
    - item: *ID?*
      - count: *I?*

### clone
- clone
  - x1, y1, z1: *Coord*
    - x2, y2, z2: *Coord*
      - x, y, z: *Coord*
        - maskMode: *S?*
          - cloneMode: *S?*
            - TileName: *ID?*
              - dataValue|state: *I?*|*S?*

### data
- get
  - block
    - pos: *coord*
      - path: *S?*
        - scale: *I?*
  - entity
    - target: *@*
      - path: *S?*
        - scale: *I?*
- merge
  - block
    - pos: *coord*
      - nbt: *NBT*
  - entity
    - target: *@*
      - nbt: *NBT*
- remove
  - block
    - pos: *coord*
      - path: *S*
  - entity
    - target: *@*
      - path: *S*

### datapack
- disable
  - name
- enable
  - name: *S*
    - [first|last]
    - [before|after]
      - existing: *S*
- list
  - [available|enabled]

### defaultgamemode 
- mode: *GM*

### deop
- player: *S*

### difficulty
- difficulty: *Dif?*

### effect
- give
  - entity: *@*
    - effect: *ID*
      - seconds: *I?*
        - amplifier: *I?*
          - hideParticles: *B?*
- clear
  - entity: *@*
    - effect: *ID?*

### enchant
- player
  - enchantment ID: *ID*
    - level: *I?*

### experience
- experience
  - add
    - players: *@*
      - amount: *I*
        - [points|levels]
  - set
    - players: *@*
      - amount: *I*
        - [points|levels]
  - query
    - players: 
        - points|levels

### execute
- as
  - entity: *EID*
    - chained command: *Command* 
- at
  - entity: *EID*
    - chained command: *Command*
- positioned
  - 
  - 
- align
- facing
  - 
  - 
- rotated
  - 
  - 
- in
- anchored
- if|unless
  - 
  - 
  - 
  - 
  - 
- store
- 
- 
- 

### 
- 

### 
- 
