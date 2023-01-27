import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import dayjs, { Dayjs } from 'dayjs';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import FormControl from "@mui/material/FormControl";
import InputLabel from '@mui/material/InputLabel';
import Button from '@mui/material/Button';
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
//import Interface
import {ReasonInterface} from "../../models/IReason";
import {PatienSceheduleInterface} from "../../models/IPatienSchedule";
import { EmployeeInterface } from "../../models/IEmployee";
// import { Type_of_treatments_Interface } from "../../models/IType_of_treatment";
import { PatientInterface } from "../../models/IPatient";

import {
    GetPatientSchedules,
    GetEmployee,
    GetPatient,
    GetReasons,
    PatientSchedules,
} from "../../services/HttpClientService";
const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref
  ) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });


function PatientSchedule() {

    const [patients, setPatients] = useState<PatientInterface[]>([]);
    const [employees, setEmployees] = useState<EmployeeInterface[]>([]);
    const [reasons, setReasons] = useState<ReasonInterface[]>([]);
    // const [type_of_treatmentses, setType_of_treatmentses] = useState<Type_of_treatments_Interface[]>([]);
    const [patien_schedule, setPatienSchedule] = useState<PatienSceheduleInterface>({
        Date_time: new Date(),
    });

    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);

    const handleClose = (
        event?: React.SyntheticEvent | Event,
        reason?: string
    ) => {
        if (reason === "clickaway") {
            return;
        }
        setSuccess(false);
        setError(false);
    };

    const handleChange = (event: SelectChangeEvent) => {
        const name = event.target.name as keyof typeof patien_schedule;
        setPatienSchedule({
            ...patien_schedule,
            [name]: event.target.value,
        });
    };

    const getReasons = async () => {
        let res = await GetReasons();
        patien_schedule.ReasonID = res.ID;
        if (res) {
            setReasons(res);
        }
    };

    // const getReasons = async () => {
    //     let res = await GetReasons();
    //     patien_schedule.ReasonID = res.ID;
    //     if (res) {
    //         setReasons(res);
    //     }
    // };

    const getEmployees = async () => {
        let res = await GetEmployee();
        patien_schedule.EmployeeID = res.ID;
        if (res) {
            setEmployees(res);
        }
    };
    const getPatients = async () => {
        let res = await GetPatient();
        patien_schedule.PatientID = res.ID;
        if (res) {
            setPatients(res);
        }
    };

    useEffect(() => {
        getReasons();
        getEmployees();
        getPatients();
    }, []);



const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));
  

const [value, setValue] = React.useState<Dayjs | null>(dayjs('2022-04-07'));

useEffect(() => {
    getReasons();
   
}, []);
const convertType = (data: string | number | undefined) => {
    let val = typeof data === "string" ? parseInt(data) : data;
    return val;
};
async function submit() {
    let data = {
        ReasonID: convertType(patien_schedule.ReasonID),
        Date_time: patien_schedule.Date_time
    };
    console.log(data);
    let res = await PatientSchedules(data);
    if (res) {
        setSuccess(true);
    } else {
        setError(true);
    }
}



    return (
        <div>
            <Box sx={{ flexGrow: 1 }}>
            </Box>
            <Container maxWidth="lg">
            <Snackbar
                open={success}
                autoHideDuration={6000}
                onClose={handleClose}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                >
                <Alert onClose={handleClose} severity="success">
                บันทึกข้อมูลสำเร็จ
                </Alert>
                </Snackbar>
                <Snackbar open={error} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error">
                บันทึกข้อมูลไม่สำเร็จ
                </Alert>
                </Snackbar>
                {/* <Box sx={{ bgcolor: '#cfe8fc', height: '100vh', width: '190vh' }} /> */}
                <Paper >
                    <Box
                        display={"flex"}
                        sx={{
                            marginTop: 2,
                            paddingX: 2,
                            paddingY: 2,
                        }}
                    >
                        <h2>Patient Schedule Create</h2>
                    </Box>
                    <hr />
                    <Grid container spacing={1} sx={{ padding: 2 }}>
                        <Grid xs={6}  sx={{ padding: 1.3 }}>
                        <FormControl sx = {{width: 400}}>
                        <InputLabel id="demo-simple-select-label">ชื่อ-สกุล</InputLabel>
                                <Select
                                    native
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={patien_schedule.PatientID + ""}
                                    onChange={handleChange}
                                    label= "ชื่อ-สกุล"
                                    inputProps={{
                                        name: "PatientID",
                                    }}
                                >
                                  <option aria-label="None" value="">
                                    กรุณาเลือกผู้ป่วย
                                  </option>
                                    {patients.map((item: PatientInterface) => (
                                        <option value={item.ID} key={item.ID}>
                                            {item.FirstName}
                                        </option>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid xs={6}  sx={{ padding: 1.3 }}> 
                        <FormControl sx = {{width: 400}}>
                        <InputLabel id="demo-simple-select-label">ทันตแพทย์</InputLabel>
                                <Select
                                    native
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={patien_schedule.EmployeeID + ""}
                                    onChange={handleChange}
                                    label= "ทันตแพทย์"
                                    inputProps={{
                                        name: "EmployeeID",
                                    }}
                                >
                                  <option aria-label="None" value="">
                                    กรุณาเลือกแพทย์ผู้รับผิดชอบ
                                  </option>
                                    {employees.map((item: EmployeeInterface) => (
                                        <option value={item.ID} key={item.ID}>
                                            {item.FirstName}
                                        </option>
                                    ))}
                                </Select>
                            </FormControl>

                        </Grid>
                        <Grid xs={6}  sx={{ padding: 1.3 }}>
                        <FormControl sx = {{width: 400}}>
                        <InputLabel id="demo-simple-select-label">หมายเหตุ</InputLabel>
                                <Select
                                    native
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={patien_schedule.ReasonID + ""}
                                    onChange={handleChange}
                                    label= "Reason"
                                    inputProps={{
                                        name: "ReasonID",
                                    }}
                                >
                                  <option aria-label="None" value="">
                                    กรุณาเลือกเหตุผล
                                  </option>
                                    {reasons.map((item: ReasonInterface) => (
                                        <option value={item.ID} key={item.ID}>
                                            {item.Method}
                                        </option>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid xs={6}  sx={{ padding: 1.3 }}>
                        {/* <FormControl sx = {{width: 400}}>
                        <InputLabel id="demo-simple-select-label">นัดไปห้องตรวจ</InputLabel>
                                <Select
                                    native
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={patien_schedule.ReasonID + ""}
                                    onChange={handleChange}
                                    label= "Reason"
                                    inputProps={{
                                        name: "ReasonID",
                                    }}
                                >
                                  <option aria-label="None" value="">
                                    กรุณาเลือกห้องตรวจ
                                  </option>
                                    {reasons.map((item: ReasonInterface) => (
                                        <option value={item.ID} key={item.ID}>
                                            {item.Method}
                                        </option>
                                    ))}
                                </Select>
                            </FormControl> */}
                        </Grid>
                        <Grid xs={6}  sx={{ padding: 1.3 }}>
                        {/* <FormControl sx = {{width: 400}}>
                        <InputLabel id="demo-simple-select-label">ประเภทการรักษา</InputLabel>
                                <Select
                                    native
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={patien_schedule.ReasonID + ""}
                                    onChange={handleChange}
                                    label= "Reason"
                                    inputProps={{
                                        name: "ReasonID",
                                    }}
                                >
                                  <option aria-label="None" value="">
                                    กรุณาเลือกประภทการรักษา
                                  </option>
                                    {reasons.map((item: ReasonInterface) => (
                                        <option value={item.ID} key={item.ID}>
                                            {item.Method}
                                        </option>
                                    ))}
                                </Select>
                            </FormControl> */}
                        </Grid>
                        <Grid xs={3.25} sx={{ padding: 1.3 }}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DateTimePicker 
                            renderInput={(props) => <TextField {...props} />}
                            label="วันนัดเข้าพบแพทย์"
                            value={patien_schedule.Date_time}
                            onChange={(newValue) => {
                                setPatienSchedule({
                                    ...patien_schedule,
                                    Date_time: newValue,
                                  });
                            }}
                            
                        />
                        </LocalizationProvider>
                        </Grid>
                        <Grid xs={2.75} sx={{ padding: 1.3 }}>
                        <Button sx={{ paddingY: 1.7, }} fullWidth variant="outlined" size="large" onClick={submit}>
                                บันทึกข้อมูล
                            </Button>
                        
                        </Grid>
                     
                        <Grid xs={6}>
                       
                        </Grid>
                        <Grid xs={6}>
                        
                        </Grid>
                        <Grid xs={3}>
                        
                        </Grid>
                    </Grid>

                </Paper >

                <Grid xs={12}>

                </Grid>
            
            </Container>

        </div>

    );
}




export default PatientSchedule;