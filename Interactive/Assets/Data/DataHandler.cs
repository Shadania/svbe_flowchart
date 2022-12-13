using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using System.IO;

[Serializable]
public class FlowchartData
{
    public List<string> states;
    public string initialState;
    public List<string> facts;
}

[Serializable]
public class FlowchartState
{
    public string id;
    public string bodyText;
    public string type;
}

[Serializable]
public class MultipleChoiceOption
{
    public string id;
    public string text;
    public string goesTo;
}

[Serializable]
public class FlowchartState_multipleChoice : FlowchartState
{
    public List<MultipleChoiceOption> choices;
}

[Serializable]
public class FlowchartState_information : FlowchartState
{
    public string goesTo;
}

[Serializable]
public class RangeOption
{
    public int value;
    public string goesTo;
}

[Serializable]
public class FlowchartState_range : FlowchartState
{
    public List<RangeOption> choices;
}

public class DataHandler : Sapphus.Singleton<DataHandler>
{
    private FlowchartData _fData;
    private Dictionary<string, FlowchartState> _fStates = new Dictionary<string, FlowchartState>();

    private void Start()
    {
        loadData();
    }

    private void loadData()
    {
        string root = "Assets/Data/";

        // load the flowchart data itself
        StreamReader reader = new StreamReader(root + "flowchart.json");
        string contents = reader.ReadToEnd();
        _fData = JsonUtility.FromJson<FlowchartData>(contents);

        _fData.states.ForEach((state) =>
        {
            reader = new StreamReader(root + "/flowchart/" + state + ".json");
            FlowchartState fState = JsonUtility.FromJson<FlowchartState>(reader.ReadToEnd());
            // todo dimorphism
            // todo save
        });
    }
}
