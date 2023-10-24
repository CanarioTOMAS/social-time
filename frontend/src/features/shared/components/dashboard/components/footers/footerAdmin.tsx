import React from "react";
import { Container, Divider, Link, Tooltip, Typography } from "@mui/material";
import {
  Contacts,
  Instagram,
  PlaylistAddCheckCircle,
  WhatsApp,
} from "@mui/icons-material";

export default function FooterAdmin() {
  const footerStyle = {
    backgroundColor: "#3b82f6",
    paddingTop: "20px",
    paddingBottom: "20px",
  };
  return (
    <footer className="block py-4" style={footerStyle}>
      <Container maxWidth="lg">
        <Divider />
        <div className="flex flex-wrap items-center md:justify-between justify-center">
          <div className="w-full md:w-4/12 px-4">
            <Typography
              variant="body2"
              color="textSecondary"
              fontWeight="bold"
              sx={{ py: 1, textAlign: { xs: "center", md: "left" } }}
            >
              Copyright © {new Date().getFullYear()}{" "}
              <Link
                href="https://"
                color="textSecondary"
                underline="hover"
                variant="body2"
                sx={{ fontWeight: "bold", py: 1 }}
              >
                Social Up
              </Link>
            </Typography>
          </div>
          <div className="w-full md:w-8/12 px-4">
            <ul className="flex flex-wrap list-none md:justify-end justify-center">
              <li>
                <Tooltip title="contacts" arrow>
                  <Link
                    href="https://"
                    color="textSecondary"
                    underline="hover"
                    variant="body2"
                    sx={{
                      fontWeight: "bold",
                      py: 1,
                      px: 3,
                    }}
                  >
                    <Contacts />
                  </Link>
                </Tooltip>
              </li>
              <li>
                <Tooltip title="whatsapp" arrow>
                  <Link
                    href="https://"
                    color="textSecondary"
                    underline="hover"
                    variant="body2"
                    sx={{
                      fontWeight: "bold",
                      py: 1,
                      px: 3,
                    }}
                  >
                    <WhatsApp />
                  </Link>
                </Tooltip>
              </li>
              <li>
                <Tooltip title="Instagram" arrow>
                  <Link
                    href="https://www.instagram.com/socialup.ok/"
                    color="textSecondary"
                    underline="hover"
                    variant="body2"
                    sx={{
                      fontWeight: "bold",
                      py: 1,
                      px: 3,
                    }}
                  >
                    <Instagram />
                  </Link>
                </Tooltip>
              </li>
              <li>
                <Tooltip title="License" arrow>
                  <Link
                    href="https://"
                    color="textSecondary"
                    underline="hover"
                    variant="body2"
                    sx={{
                      fontWeight: "bold",
                      py: 1,
                      px: 3,
                    }}
                  >
                    <PlaylistAddCheckCircle />
                  </Link>
                </Tooltip>
              </li>
            </ul>
          </div>
        </div>
      </Container>
    </footer>
  );
}
