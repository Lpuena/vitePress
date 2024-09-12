---
layout: page
---
<script setup>
import {
  VPTeamPage,
  VPTeamPageTitle,
  VPTeamMembers
} from 'vitepress/theme';

const members = [
  {
    avatar: 'https://www.github.com/lpuena.png',
    name: 'Lpuena',
    title: 'Creator',
    links: [
      { icon: 'github', link: 'https://github.com/lpuena' },
    ]
  },
]
</script>

<VPTeamPage>
  <VPTeamPageTitle>
    <template #title>
      About us
    </template>
    <template #lead>
      The blog based on VitePress .
    </template>
  </VPTeamPageTitle>
  <VPTeamMembers
    :members="members"
  />
</VPTeamPage>
