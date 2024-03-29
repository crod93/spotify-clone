import NextImage from 'next/image';
import NextLink from 'next/link';
import {
  Box,
  List,
  ListItem,
  ListIcon,
  Divider,
  LinkBox,
  LinkOverlay,
} from '@chakra-ui/layout';
import {
  MdHome,
  MdSearch,
  MdLibraryMusic,
  MdPlaylistAdd,
  MdFavorite,
} from 'react-icons/md';
import usePlaylist from '../lib/hooks/usePlaylist';

const navMenu = [
  {
    name: 'Home',
    icon: MdHome,
    route: '/',
  },
  {
    name: 'Search',
    icon: MdSearch,
    route: '/search',
  },
  {
    name: 'Library',
    icon: MdLibraryMusic,
    route: '/library',
  },
];

const musicMenu = [
  {
    name: 'Create Playlist',
    icon: MdPlaylistAdd,
    route: '/',
  },
  {
    name: 'Favorites',
    icon: MdFavorite,
    route: '/favorites',
  },
];

const Sidebar = () => {
  const { playlist } = usePlaylist();
  console.log(playlist);
  return (
    <Box
      sx={{
        width: '100%',
        height: 'calc(100vh - 100px)',
        bg: 'black',
        paddingX: '5px',
        color: 'gray',
      }}
    >
      <Box sx={{ paddingY: '20px', height: '100%' }}>
        <Box sx={{ width: '120px', marginBottom: '20px', paddingX: '20px' }}>
          <NextImage src="/trax.svg" height={60} width={120} />
        </Box>
        <Box sx={{ marginBottom: '20px' }}>
          <List spacing={2}>
            {navMenu.map((menu) => (
              <ListItem
                sx={{ paddingX: '20px', fontSize: '16px' }}
                key={menu.name}
              >
                <LinkBox>
                  <NextLink href={menu.route} passHref>
                    <LinkOverlay>
                      <ListIcon
                        as={menu.icon}
                        sx={{ color: 'white', marginRight: '20px' }}
                      />
                      {menu.name}
                    </LinkOverlay>
                  </NextLink>
                </LinkBox>
              </ListItem>
            ))}
          </List>
        </Box>

        <Box marginTop="20px">
          <List spacing={2}>
            {musicMenu.map((menu) => (
              <ListItem
                sx={{ fontSize: '16px', paddingX: '20px' }}
                key={menu.name}
              >
                <LinkBox>
                  <NextLink href={menu.route} passHref>
                    <LinkOverlay>
                      <ListIcon
                        as={menu.icon}
                        sx={{ color: 'white', marginRight: '20px' }}
                      />
                      {menu.name}
                    </LinkOverlay>
                  </NextLink>
                </LinkBox>
              </ListItem>
            ))}
          </List>
        </Box>
        <Divider color="grey.800" />
        <Box sx={{ height: '66%', overflowY: 'auto', paddingY: '20px' }}>
          <List spacing={2}>
            {playlist.map((song) => (
              <ListItem sx={{ paddingX: '20px' }} key={song.id}>
                <LinkBox>
                  <NextLink href="/" passHref>
                    <LinkOverlay>{song.name}</LinkOverlay>
                  </NextLink>
                </LinkBox>
              </ListItem>
            ))}
          </List>
        </Box>
      </Box>
    </Box>
  );
};

export default Sidebar;
