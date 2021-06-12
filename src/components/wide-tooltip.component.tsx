import { Tooltip, withStyles } from "@material-ui/core";

const WideTooltip = withStyles(() => ({
    arrow: {
        color: 'white'
    },
    tooltip: {
        font: 'inherit',
        padding: 0,
        maxWidth: "none"
    }
}))(Tooltip);

export default WideTooltip