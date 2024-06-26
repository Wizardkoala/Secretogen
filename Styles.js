import { version } from 'react';
import { StyleSheet } from 'react-native';

export const colors = {
  primary: "#7ea8bd",
  midground: "#838C96",
  background: "#F4F8FB",
  pushedBack: "#E6EAED"
}

export const refreshButton = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginBottom: 10
  },
  button: {
    alignContent: "flex-end",
    margin: 10,
    flex: 1
  },
  spacer: {
    flex: 1,
    width: 'auto'
  }
})

export const formulaBox = StyleSheet.create({
  background: {
    backgroundColor: colors.pushedBack,
    alignSelf: 'center',
    minHeight: 40,
    width: 300,
    paddingHorizontal: 20,
    paddingTop: 0,
    paddingBottom: 5,
    borderRadius: 10
  },
  title: {
    fontSize: 11,
    fontFamily: "times",
    fontWeight: "light",
    color: colors.midground,
    marginTop: -9
  },
  input: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: colors.midground
  },
})

export const password = StyleSheet.create({
  password: {
    backgroundColor: colors.pushedBack,
    paddingHorizontal: 25,
    paddingVertical: 5,
    marginBottom: 8,
    flexDirection: 'row',
    flex: 1
  },
  text: {
    flex: 8,
    color: colors.primary,
    fontFamily: 'courier',
    fontWeight: "bold",
    fontSize: 20,
    flexWrap: 'wrap',
  },
  index: {
    flex: 1,
    alignSelf: 'center',
    color: colors.midground,
    fontFamily: 'courier',
    fontWeight: "bold",
    fontSize: 20,
    maxWidth: 20,
  },
  lineVertical: {
    backgroundColor: colors.midground,
    flex: 1,
    height: 'auto',
    maxWidth: 2,
    marginHorizontal: 10,
  },
})

export const disclaimer = StyleSheet.create({
  container: {
    alignContent: 'center',
    alignSelf: 'center',
  },
  regular: {
    textAlign: 'center',
    color: colors.midground
  },
  version: {
    fontSize: 13,
    alignSelf: 'flex-end',
    color: colors.midground
  }
})

export const general = StyleSheet.create({
  spacer: {
    flex: 1,
    minHeight: 40,
    maxHeight: 60
  },
  line: {
    height: 2,
    margin: 12,
    width: 350,
    backgroundColor: colors.pushedBack,
    borderRadius: 100
  },
  container: {
    flex: 1,
    margin: 0,
    backgroundColor: colors.background,
    alignItems: 'stretch',
    justifyContent: 'space-around'
  },
  text: {
    color: "#fff",
    fontSize: 20,
  },
});
