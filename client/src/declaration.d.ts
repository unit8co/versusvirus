declare module "@material-ui/icons/utils/createSvgIcon" {
    import SvgIcon from '@material-ui/core/SvgIcon';

    declare function createSvgIcon(path: React.ComponentType, displayName: string): typeof SvgIcon;

    export default createSvgIcon;
}