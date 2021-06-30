import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

import amazonPlaceholder from "../../public/img/amazonPlaceholder.png";
import ebayPlaceholder from "../../public/img/ebayPlaceholder.png";
import targetPlaceholder from "../../public/img/targetPlaceholder.png";

const useStyles = makeStyles((theme) => ({
  root: {
    width: 345,
    margin: theme.spacing(2),
  },
  li: {
    listStyle: "none",
  },
  cardHeader: {
    height: "130px",
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  price: {
    textAlign: "left",
  },
  link: {
    textAlign: "right",
  },
  favoriteIconSize: {
    fontSize: "30px",
  },
  isFavoriteFilled: {
    fontSize: "30px",
    color: theme.palette.secondary.light,
  },
  retailAvatar: {
    backgroundColor: "#00000000",
  },
}));

function RetailItem({
  addFavorite,
  removeFavorite,
  markFavorite,
  unmarkFavorite,
  currentItemId,
  retailer,
  title,
  price,
  image,
  link,
  logo,
}) {
  const classes = useStyles();
  const [placeholder, setPlaceholder] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);

  const handleFavoriteToggle = () => {
    setIsFavorite(!isFavorite);
    isFavorite
      ? unmarkFavorite(retailer, currentItemId) && removeFavorite(currentItemId)
      : markFavorite(retailer, currentItemId) &&
        addFavorite({
          id: currentItemId,
          retailer,
          title,
          price,
          link,
          image,
          logo,
        });
  };

  useEffect(() => {
    retailer === "ebay" && setPlaceholder(ebayPlaceholder);
    retailer === "amazon" && setPlaceholder(amazonPlaceholder);
    retailer === "target" && setPlaceholder(targetPlaceholder);
  }, []);

  return (
    <li className={classes.li}>
      <Card className={classes.root} elevation={2}>
        <CardHeader
          className={classes.cardHeader}
          avatar={
            <Avatar
              variant="square"
              aria-label="retailer-logo"
              className={classes.retailAvatar}
            >
              {logo}
            </Avatar>
          }
          action={
            <IconButton
              value={currentItemId}
              onClick={handleFavoriteToggle}
              aria-label="add to favorites"
            >
              {isFavorite && (
                <FavoriteIcon className={classes.isFavoriteFilled} />
              )}
              {!isFavorite && (
                <FavoriteBorderIcon className={classes.favoriteIconSize} />
              )}
            </IconButton>
          }
          title={
            <Typography variant="body1">
              {title ? title : "searchTerm"}
            </Typography>
          }
        />
        <CardMedia
          className={classes.media}
          style={
            !image ? { backgroundSize: "contain", margin: "0px 16px" } : null
          }
          image={image ? image : placeholder}
          title={title}
        />
        <CardContent>
          <Typography
            className={classes.price}
            variant="h3"
            color="textSecondary"
            component="p"
          >
            {price}
          </Typography>
          <Button variant="contained" color="primary" href={link}>
            Go
          </Button>
        </CardContent>
      </Card>
    </li>
  );
}

export default RetailItem;
