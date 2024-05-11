import { StyleSheet } from 'react-native';

export const colors = {
    primary: "#7ea8bd",
    midground: "#838C96",
    background: "#F4F8FB",
    pushedBack: "#E6EAED"
}

export const formulaBox = StyleSheet.create({
    background: {
        backgroundColor: colors.pushedBack,
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

export const general = StyleSheet.create({
  passList: {
    flex: 10
  },
  spacer: {
    flex: 1,
    minHeight: 10,
    maxHeight: 40
  },
  line: {
    height: 2,
    margin: 6,
    width: 350,
    backgroundColor: colors.pushedBack,
    borderRadius: 100
  },
  disclaimer: {
    alignContent: 'flex-end',
    marginTop: 10,
  },
  refreshButton: {
    alignContent: "flex-end",
    margin: 10
  },
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: colors.background,
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
  },
  text: {
    color: "#fff",
    fontSize: 20,
  },
  password: {
    backgroundColor: colors.midground,
    borderRadius: 20,
    minWidth: 300,
    padding: 15,
    paddingHorizontal: 25,
    marginBottom: 8
  }
});
