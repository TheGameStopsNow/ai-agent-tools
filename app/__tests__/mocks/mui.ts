import React from 'react';

const createMockComponent = (name: string) => {
  return React.forwardRef((props: any, ref) => {
    return React.createElement(name, { ...props, ref });
  });
};

export const Button = createMockComponent('button');
export const Card = createMockComponent('div');
export const CardContent = createMockComponent('div');
export const CardActions = createMockComponent('div');
export const TextField = createMockComponent('input');
export const Typography = createMockComponent('p');
export const IconButton = createMockComponent('button');
export const Dialog = createMockComponent('div');
export const DialogTitle = createMockComponent('div');
export const DialogContent = createMockComponent('div');
export const DialogActions = createMockComponent('div');
export const Tab = createMockComponent('button');
export const Tabs = createMockComponent('div');
export const Box = createMockComponent('div');
export const Paper = createMockComponent('div');
export const Grid = createMockComponent('div');
export const Container = createMockComponent('div');
export const CircularProgress = createMockComponent('div');
export const Snackbar = createMockComponent('div');
export const Alert = createMockComponent('div');
export const Menu = createMockComponent('div');
export const MenuItem = createMockComponent('div');
export const List = createMockComponent('ul');
export const ListItem = createMockComponent('li');
export const ListItemText = createMockComponent('div');
export const ListItemIcon = createMockComponent('div');
export const Divider = createMockComponent('hr');
export const Drawer = createMockComponent('div');
export const AppBar = createMockComponent('div');
export const Toolbar = createMockComponent('div');

// Icons
export const EditIcon = createMockComponent('svg');
export const DeleteIcon = createMockComponent('svg');
export const AddIcon = createMockComponent('svg');
export const MenuIcon = createMockComponent('svg');
export const CloseIcon = createMockComponent('svg');
export const MoreVertIcon = createMockComponent('svg');
export const ShareIcon = createMockComponent('svg');
export const PersonAddIcon = createMockComponent('svg');
export const PersonRemoveIcon = createMockComponent('svg'); 