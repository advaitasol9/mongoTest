#!/usr/bin/env python
# coding: utf-8

# In[71]:


import sys
from pydfs_lineup_optimizer import get_optimizer, Site, Sport


# In[72]:

numLineups = int(sys.argv[1])
optimizer = get_optimizer(Site.FANDUEL, Sport.HOCKEY)


# In[73]:


optimizer.load_players_from_csv('fd.csv')


# In[74]:


pool = optimizer.player_pool


# In[93]:


lineups = list(optimizer.optimize(n=numLineups))


# In[107]:


arr = []
for lineup in lineups:
    arr.append({'players': list(lineup.players), 'fantasyPoints': lineup.fantasy_points_projection, 'salary': lineup.salary_costs})
print(arr)


# In[ ]:




