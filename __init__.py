# Command Parameters              Attribute     Parameter
# fill    x1 y1 z1 x2 y2 z2 block BlockHandling dataTag
# fill[x1,y1,z1][x2,y2,z2][block].BlockHandling[dataTag]
# fill[Point()][Point()][ID()].BlockHandling[NBT]

# structure command:
# - type>'command'
# - name>string

# structure attribute:
# - type>'attribute'
# - name>string

# structure parameter:
# - type>'parameter'
# - name>string
# - ptype>string




class Command:
	def __init__(self, structure=None):
		self.structure = structure or {}
	
	def __getitem__(self, item):
		pass
	
	def __getattr__(self, item):
		pass


class Namespace:
	def __init__(self):
		pass
