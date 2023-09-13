import { ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import DoneAllIcon from '@mui/icons-material/DoneAll';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import CloseIcon from '@mui/icons-material/Close';

const GameStatusIcon = ({ status }) => {
    if (status === 'won') {
        return <DoneAllIcon color='success' />;
    }

    if (status === 'lost') {
        return <CloseIcon color='error' />;
    }

    return <PlayArrowIcon color='warning' />;
}

export function GameListItem({ game, setCurrentGame }) {

    const handleClick = () => {
        setCurrentGame(game);
    }


    return (
        <ListItem>
            <ListItemButton onClick={handleClick}>
                <ListItemIcon>
                    <GameStatusIcon status={game.status} />
                </ListItemIcon>
                <ListItemText primary={game.created_at} />
            </ListItemButton>
        </ListItem>
    );
}