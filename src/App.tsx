import React, { useState } from "react";
import "./App.css";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Grid,
  List,
  ListItem,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { ZipCounty } from "./Objects/ZipCounty";
import Input from "@mui/material/Input";
import { Policy } from "./Objects/Policy";
import { Background } from "./Components/CustomBackground";

function App(): JSX.Element {
  const [zipCode, setZipCode] = useState<string>("");
  const [currentCounty, setCurrentCounty] = useState<ZipCounty[]>();
  const [userAge, setUserAge] = useState<number>(0);
  const [policyList, setPolicyList] = useState<Policy[]>();
  const [smokingStatus, setSmokingStatus] = useState<string>("nonsmoker");
  const [gender, setGender] = useState<string>("male");
  const [userPolicy, setUserPolicy] = useState<Policy>();

  const getZipCounty = async (zipCode: string) => {
    const zipCountyArray: ZipCounty[] = [];
    const result = await axios.get(
      "http://tech-screen.venteur.co/ZipCounties",
      {
        params: { zip: zipCode },
      }
    );
    result.data.map((county: any) =>
      zipCountyArray.push(new ZipCounty(county))
    );
    setCurrentCounty(zipCountyArray);
  };

  function handleSmokingUpdate() {
    if (smokingStatus === "smoker") {
      setSmokingStatus("non-smoker");
    } else {
      setSmokingStatus("smoker");
    }
  }
  function handleGenderUpdate() {
    if (gender === "male") {
      setGender("female");
    } else {
      setGender("male");
    }
  }
  const getUserQuotes = async (
    zipCodeId: string,
    smokingStatus: string,
    gender: string,
    userAge: number
  ) => {
    const userQuoteArray: Policy[] = [];
    const result = await axios.post(
      "http://tech-screen.venteur.co/Policies/Quote",
      {
        zipCountyId: zipCodeId,
        age: userAge,
        gender: gender,
        smoker: smokingStatus,
      },
      {
        headers: {
          "content-type": "application/json",
        },
      }
    );
    result.data.map((quote: any) => userQuoteArray.push(new Policy(quote)));
    setPolicyList(userQuoteArray);
  };
  const enrollUserInPolicy = async (
    zipCodeId: string,
    smokingStatus: string,
    gender: string,
    userAge: number,
    policyId: string,
    benefitAmount: number
  ) => {
    const result = await axios.post(
      "http://tech-screen.venteur.co/Policies/Enroll",
      {
        zipCountyId: zipCodeId,
        age: userAge,
        gender: gender,
        smoker: smokingStatus,
        policyId: policyId,
        benefitAmount: benefitAmount,
      },
      {
        headers: {
          "content-type": "application/json",
        },
      }
    );
    setUserPolicy(new Policy(result.data[0]));
  };

  return (
    <Background>
      <Grid container sm={6}>
        <Grid item>
          <Box display="flex" alignContent="flex-start">
            <TextField
              color="primary"
              label="Zip Code"
              onChange={(zip: any) => setZipCode(zip.target.value)}
            ></TextField>
            <Button variant="contained" onClick={() => getZipCounty(zipCode)}>
              <Typography variant="subtitle1">Submit</Typography>
            </Button>
          </Box>
        </Grid>
        <Grid item>
          {currentCounty
            ? currentCounty.map((x) => (
                <Accordion key={x.id}>
                  <AccordionSummary>
                    <Typography
                      variant="subtitle1"
                      style={{ textTransform: "none" }}
                    >
                      {x.city}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <List>
                      <ListItem>
                        <Typography variant="subtitle2">{x.id}</Typography>
                      </ListItem>

                      <ListItem>
                        <Typography variant="subtitle2">{x.city}</Typography>
                      </ListItem>
                      <ListItem>
                        <Typography variant="subtitle2">{x.state}</Typography>
                      </ListItem>
                      <ListItem>
                        <Typography variant="subtitle2">{x.county}</Typography>
                      </ListItem>
                      <ListItem>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() =>
                            setCurrentCounty(
                              currentCounty.filter(
                                (selectedZip) => selectedZip.id == x.id
                              )
                            )
                          }
                        >
                          <Typography style={{ textTransform: "none" }}>
                            Select?
                          </Typography>
                        </Button>
                      </ListItem>
                    </List>
                  </AccordionDetails>
                </Accordion>
              ))
            : null}
          <Grid item>
            {currentCounty &&
            currentCounty.length === 1 &&
            policyList?.length !== 1 ? (
              <Accordion key={currentCounty[0].id}>
                <AccordionSummary>
                  <Typography
                    variant="subtitle1"
                    style={{ textTransform: "none" }}
                  >
                    Please answer the questions below.
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <List>
                    <ListItem alignItems="flex-start">
                      <FormGroup>
                        <FormControlLabel
                          control={<Checkbox onClick={handleSmokingUpdate} />}
                          label="Smoker?"
                        />
                      </FormGroup>
                    </ListItem>

                    <ListItem alignItems="flex-start">
                      <FormGroup row>
                        <Typography>Male</Typography>
                        <FormControlLabel
                          control={<Switch onChange={handleGenderUpdate} />}
                          label="Gender?"
                        />
                        <Typography>Female</Typography>
                      </FormGroup>
                    </ListItem>
                    <ListItem alignItems="flex-start">
                      <Input
                        type="number"
                        error={userAge <= 0}
                        onChange={(age) =>
                          setUserAge(
                            Math.abs(age.target.value as unknown as number)
                          )
                        }
                      />
                    </ListItem>
                    <ListItem alignItems="flex-start">
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() =>
                          getUserQuotes(
                            currentCounty[0].id,
                            smokingStatus,
                            gender,
                            userAge
                          )
                        }
                      >
                        <Typography style={{ textTransform: "none" }}>
                          Submit?
                        </Typography>
                      </Button>
                    </ListItem>
                  </List>
                </AccordionDetails>
              </Accordion>
            ) : null}
          </Grid>
          <Grid item spacing={3}>
            {policyList && !userPolicy ? (
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>
                        <Typography variant="subtitle2">Carrier</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="subtitle2">Term</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="subtitle2">
                          Min Benefit Amount
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="subtitle2">
                          Max Benefit Amount
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="subtitle2">
                          Annual Premium Rate
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="subtitle2">Select?</Typography>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {policyList.map((x) => (
                      <TableRow key={x.id}>
                        <TableCell>
                          <Typography variant="subtitle2">
                            {x.carrierName}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="subtitle2">{x.term}</Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="subtitle2">
                            {x.minBenefitAmount}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="subtitle2">
                            {x.maxBenefitAmount}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="subtitle2">
                            {x.annualPremiumRate}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Button
                            color="primary"
                            onClick={() =>
                              enrollUserInPolicy(
                                x.zipCountyId,
                                smokingStatus,
                                gender,
                                userAge,
                                x.id,
                                x.annualPremiumRate
                              )
                            }
                          >
                            <Typography variant="subtitle2">select</Typography>
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            ) : null}
          </Grid>
        </Grid>
      </Grid>
    </Background>
  );
}

export default App;
