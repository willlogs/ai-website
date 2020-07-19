import React from "react";
import PropTypes from "prop-types";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  withStyles
} from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ColoredButton from "../../../shared/components/ColoredButton";

const styles = theme => ({
  termsConditionsListitem: {
    marginLeft: theme.spacing(3),
    marginTop: theme.spacing(1)
  },
  dialogActions: {
    justifyContent: "flex-start",
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    paddingRight: theme.spacing(2)
  },
  backIcon: {
    marginRight: theme.spacing(1)
  }
});

function TermsOfServiceDialog(props) {
  const { classes, onClose, theme } = props;
  return (
    <Dialog open scroll="paper" onClose={onClose} hideBackdrop>
      <DialogTitle>قوانین</DialogTitle>
      <DialogContent>        
        <Typography paragraph>
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
          nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
          sed diam voluptua. At vero eos et accusam et justo duo dolores et ea
          rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem
          ipsum dolor sit amet.
        </Typography>
      </DialogContent>
      <DialogActions className={classes.dialogActions}>
        <ColoredButton
          onClick={onClose}
          variant="contained"
          color={theme.palette.common.black}
        >
          <ArrowBackIcon className={classes.backIcon} />
          بازگشت
        </ColoredButton>
      </DialogActions>
    </Dialog>
  );
}

TermsOfServiceDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  theme: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(TermsOfServiceDialog);
